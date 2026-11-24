#!/usr/bin/env swift
import Foundation
import AppKit
import CoreGraphics

struct SpriteJob {
    let outputName: String
    let sourceFile: String
    let maxHeightOverride: Int?
}

let sourceDir = "/Users/taylorlehman/.gemini/antigravity/brain/2b6e15c3-74d2-42d8-a521-27b68278c515"
let projectDir = "/Users/taylorlehman/.gemini/antigravity/scratch/lotr-polytopia"
let outputDir = "\(projectDir)/public/sprites"

let jobs: [SpriteJob] = [
    SpriteJob(outputName: "humans_warrior", sourceFile: "humans_warrior_1795404812934.jpg", maxHeightOverride: nil),
    SpriteJob(outputName: "humans_defender", sourceFile: "humans_defender_1795404862603.jpg", maxHeightOverride: nil),
    SpriteJob(outputName: "humans_archer", sourceFile: "humans_archer_1795404880033.jpg", maxHeightOverride: nil),
    SpriteJob(outputName: "humans_rider", sourceFile: "humans_rider_bluecloak_1795404881056.jpg", maxHeightOverride: nil),
    SpriteJob(outputName: "humans_catapult", sourceFile: "humans_catapult_1795404866277.jpg", maxHeightOverride: nil),
    SpriteJob(outputName: "humans_rohirrim_knight", sourceFile: "humans_rohirrim_knight_1795404866502.jpg", maxHeightOverride: nil),
    SpriteJob(outputName: "orcs_warrior", sourceFile: "orcs_warrior_1795404781947.jpg", maxHeightOverride: nil),
    SpriteJob(outputName: "orcs_defender", sourceFile: "orcs_defender_1795404869150.jpg", maxHeightOverride: nil),
    SpriteJob(outputName: "elves_elven_sentinel", sourceFile: "elves_sentinel_1795404804099.jpg", maxHeightOverride: nil),
    SpriteJob(outputName: "dwarves_ironbreaker", sourceFile: "dwarves_ironbreaker_1795404781741.jpg", maxHeightOverride: 432),
]

let fm = FileManager.default
try fm.createDirectory(atPath: outputDir, withIntermediateDirectories: true)

@inline(__always)
func isExteriorMagenta(_ r: Int, _ g: Int, _ b: Int) -> Bool {
    return r > 125 && b > 125 && g < 135 && (r - g) > 45 && (b - g) > 45 && abs(r - b) < 80
}

@inline(__always)
func isInteriorMagentaSeed(_ r: Int, _ g: Int, _ b: Int) -> Bool {
    return r > 130 && b > 130 && g < 115 && (r - g) > 45 && (b - g) > 45 && abs(r - b) < 70
}

func processSprite(_ job: SpriteJob) throws {
    let inputPath = "\(sourceDir)/\(job.sourceFile)"
    let outputPath = "\(outputDir)/\(job.outputName).png"

    guard let data = try? Data(contentsOf: URL(fileURLWithPath: inputPath)),
          let nsImage = NSImage(data: data),
          let cgSource = nsImage.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        throw NSError(domain: "SpritePipeline", code: 1, userInfo: [NSLocalizedDescriptionKey: "Failed to load \(inputPath)"])
    }

    let width = cgSource.width
    let height = cgSource.height
    let totalPixels = width * height
    var pixels = [UInt8](repeating: 0, count: totalPixels * 4)

    let colorSpace = CGColorSpaceCreateDeviceRGB()
    guard let decodeCtx = CGContext(
        data: &pixels,
        width: width,
        height: height,
        bitsPerComponent: 8,
        bytesPerRow: width * 4,
        space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    ) else {
        throw NSError(domain: "SpritePipeline", code: 2, userInfo: [NSLocalizedDescriptionKey: "Failed to create decode context"])
    }
    decodeCtx.draw(cgSource, in: CGRect(x: 0, y: 0, width: width, height: height))

    // 1. Exterior BFS flood-fill from all 4 borders
    var isBg = [Bool](repeating: false, count: totalPixels)
    var queue = [Int]()
    queue.reserveCapacity(totalPixels / 2)

    func trySeed(_ x: Int, _ y: Int) {
        let idx = y * width + x
        if isBg[idx] { return }
        let o = idx * 4
        if isExteriorMagenta(Int(pixels[o]), Int(pixels[o + 1]), Int(pixels[o + 2])) {
            isBg[idx] = true
            queue.append(idx)
        }
    }

    for x in 0..<width {
        trySeed(x, 0)
        trySeed(x, height - 1)
    }
    for y in 0..<height {
        trySeed(0, y)
        trySeed(width - 1, y)
    }

    // 2. Also seed enclosed interior magenta pockets
    for y in 1..<(height - 1) {
        let row = y * width
        for x in 1..<(width - 1) {
            let idx = row + x
            if isBg[idx] { continue }
            let o = idx * 4
            if isInteriorMagentaSeed(Int(pixels[o]), Int(pixels[o + 1]), Int(pixels[o + 2])) {
                isBg[idx] = true
                queue.append(idx)
            }
        }
    }

    // Run BFS across exterior + interior seeds
    var qHead = 0
    while qHead < queue.count {
        let idx = queue[qHead]
        qHead += 1
        let x = idx % width
        let y = idx / width

        let neighbors = [
            x > 0 ? idx - 1 : -1,
            x < width - 1 ? idx + 1 : -1,
            y > 0 ? idx - width : -1,
            y < height - 1 ? idx + width : -1,
        ]
        for nIdx in neighbors where nIdx >= 0 && !isBg[nIdx] {
            let o = nIdx * 4
            if isExteriorMagenta(Int(pixels[o]), Int(pixels[o + 1]), Int(pixels[o + 2])) {
                isBg[nIdx] = true
                queue.append(nIdx)
            }
        }
    }

    for idx in 0..<totalPixels where isBg[idx] {
        let o = idx * 4
        pixels[o] = 0
        pixels[o + 1] = 0
        pixels[o + 2] = 0
        pixels[o + 3] = 0
    }

    // 3. Remove tiny isolated non-bg JPEG dust islands (< 24 pixels)
    var visited = [Bool](repeating: false, count: totalPixels)
    var comp = [Int]()
    comp.reserveCapacity(128)
    for start in 0..<totalPixels {
        if pixels[start * 4 + 3] == 0 || visited[start] { continue }
        comp.removeAll(keepingCapacity: true)
        visited[start] = true
        comp.append(start)
        var head = 0
        while head < comp.count {
            let cur = comp[head]
            head += 1
            let x = cur % width
            let y = cur / width
            if x > 0 && !visited[cur - 1] && pixels[(cur - 1) * 4 + 3] > 0 { visited[cur - 1] = true; comp.append(cur - 1) }
            if x < width - 1 && !visited[cur + 1] && pixels[(cur + 1) * 4 + 3] > 0 { visited[cur + 1] = true; comp.append(cur + 1) }
            if y > 0 && !visited[cur - width] && pixels[(cur - width) * 4 + 3] > 0 { visited[cur - width] = true; comp.append(cur - width) }
            if y < height - 1 && !visited[cur + width] && pixels[(cur + width) * 4 + 3] > 0 { visited[cur + width] = true; comp.append(cur + width) }
        }
        if comp.count < 24 {
            for idx in comp {
                let o = idx * 4
                pixels[o] = 0; pixels[o + 1] = 0; pixels[o + 2] = 0; pixels[o + 3] = 0
            }
        }
    }

    // 4. 2-pass magenta fringe despill & halo cleanup on boundary pixels
    for pass in 0..<3 {
        let alphaSnapshot = (0..<totalPixels).map { pixels[$0 * 4 + 3] }
        let threshold = pass == 0 ? 14 : (pass == 1 ? 12 : 10)
        for y in 0..<height {
            let yMin = max(0, y - 1)
            let yMax = min(height - 1, y + 1)
            for x in 0..<width {
                let idx = y * width + x
                let a = alphaSnapshot[idx]
                if a == 0 { continue }

                // Check 8-neighborhood for any transparent or semi-transparent pixel
                var touchesTrans = false
                let xMin = max(0, x - 1)
                let xMax = min(width - 1, x + 1)
                outer: for ny in yMin...yMax {
                    let nrow = ny * width
                    for nx in xMin...xMax {
                        if alphaSnapshot[nrow + nx] < 220 {
                            touchesTrans = true
                            break outer
                        }
                    }
                }
                if !touchesTrans { continue }

                let o = idx * 4
                let r = Int(pixels[o])
                let g = Int(pixels[o + 1])
                let b = Int(pixels[o + 2])
                let excess = min(r, b) - g

                if excess > threshold {
                    let frac = min(1.0, Float(excess) / 215.0)
                    if pass == 0 && frac > 0.36 {
                        // Strongly magenta anti-aliased fringe -> transparent
                        pixels[o] = 0
                        pixels[o + 1] = 0
                        pixels[o + 2] = 0
                        pixels[o + 3] = 0
                    } else {
                        // Despill magenta back to neutral/ink tone and feather alpha on pass 0/1
                        let cap = min(255, g + 4)
                        let newR = min(r, cap)
                        let newB = min(b, cap)
                        let alphaFactor: Float = pass < 2 ? max(0.0, 1.0 - frac * (pass == 0 ? 1.55 : 0.85)) : 1.0
                        let newA = UInt8(max(0, min(255, Int(round(Float(a) * alphaFactor)))))
                        if newA < 18 {
                            pixels[o] = 0; pixels[o + 1] = 0; pixels[o + 2] = 0; pixels[o + 3] = 0
                        } else {
                            pixels[o] = UInt8(newR)
                            pixels[o + 1] = UInt8(g)
                            pixels[o + 2] = UInt8(newB)
                            pixels[o + 3] = newA
                        }
                    }
                }
            }
        }
    }

    // 5. Find tight bounding box of visible pixels
    var minX = width
    var maxX = -1
    var minY = height
    var maxY = -1
    for y in 0..<height {
        let row = y * width
        for x in 0..<width {
            let a = pixels[(row + x) * 4 + 3]
            if a > 24 {
                if x < minX { minX = x }
                if x > maxX { maxX = x }
                if y < minY { minY = y }
                if y > maxY { maxY = y }
            }
        }
    }

    guard maxX >= minX && maxY >= minY else {
        throw NSError(domain: "SpritePipeline", code: 3, userInfo: [NSLocalizedDescriptionKey: "Empty sprite after keying: \(job.outputName)"])
    }

    let cropW = maxX - minX + 1
    let cropH = maxY - minY + 1

    // Build cropped premultiplied RGBA buffer so high-quality scaling never bleeds transparent pixels
    var croppedPremul = [UInt8](repeating: 0, count: cropW * cropH * 4)
    for y in 0..<cropH {
        for x in 0..<cropW {
            let srcO = ((minY + y) * width + (minX + x)) * 4
            let dstO = (y * cropW + x) * 4
            let a = Int(pixels[srcO + 3])
            if a == 0 { continue }
            croppedPremul[dstO] = UInt8((Int(pixels[srcO]) * a + 127) / 255)
            croppedPremul[dstO + 1] = UInt8((Int(pixels[srcO + 1]) * a + 127) / 255)
            croppedPremul[dstO + 2] = UInt8((Int(pixels[srcO + 2]) * a + 127) / 255)
            croppedPremul[dstO + 3] = UInt8(a)
        }
    }

    let cropData = Data(croppedPremul)
    guard let provider = CGDataProvider(data: cropData as CFData),
          let croppedImage = CGImage(
            width: cropW,
            height: cropH,
            bitsPerComponent: 8,
            bitsPerPixel: 32,
            bytesPerRow: cropW * 4,
            space: colorSpace,
            bitmapInfo: CGBitmapInfo(rawValue: CGImageAlphaInfo.premultipliedLast.rawValue),
            provider: provider,
            decode: nil,
            shouldInterpolate: true,
            intent: .defaultIntent
          ) else {
        throw NSError(domain: "SpritePipeline", code: 4, userInfo: [NSLocalizedDescriptionKey: "Failed to build cropped CGImage"])
    }

    // 6. Scale cleanly into 512x512, 18px side/top padding, bottom-anchored at y = 502 (CG bottom = 10)
    let outSize = 512
    let padSide = 18
    let padTop = 18
    let bottomAnchorTopDown = 502
    let maxDrawW = outSize - padSide * 2          // 476
    let maxDrawH = job.maxHeightOverride ?? (bottomAnchorTopDown - padTop) // 484 (or 432 for stout dwarf)

    let scale = min(CGFloat(maxDrawW) / CGFloat(cropW), CGFloat(maxDrawH) / CGFloat(cropH))
    let drawW = round(CGFloat(cropW) * scale)
    let drawH = round(CGFloat(cropH) * scale)
    let drawX = round((CGFloat(outSize) - drawW) / 2.0)
    let drawY = CGFloat(outSize - bottomAnchorTopDown) // CGContext origin is bottom-left!

    var outPixels = [UInt8](repeating: 0, count: outSize * outSize * 4)
    guard let outCtx = CGContext(
        data: &outPixels,
        width: outSize,
        height: outSize,
        bitsPerComponent: 8,
        bytesPerRow: outSize * 4,
        space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    ) else {
        throw NSError(domain: "SpritePipeline", code: 5, userInfo: [NSLocalizedDescriptionKey: "Failed to create output context"])
    }

    outCtx.interpolationQuality = .high
    outCtx.clear(CGRect(x: 0, y: 0, width: outSize, height: outSize))
    outCtx.draw(croppedImage, in: CGRect(x: drawX, y: drawY, width: drawW, height: drawH))

    guard let outCG = outCtx.makeImage() else {
        throw NSError(domain: "SpritePipeline", code: 6, userInfo: [NSLocalizedDescriptionKey: "Failed to make output CGImage"])
    }

    let bitmapRep = NSBitmapImageRep(cgImage: outCG)
    bitmapRep.size = NSSize(width: outSize, height: outSize)
    guard let pngData = bitmapRep.representation(using: .png, properties: [:]) else {
        throw NSError(domain: "SpritePipeline", code: 7, userInfo: [NSLocalizedDescriptionKey: "Failed to encode PNG"])
    }

    try pngData.write(to: URL(fileURLWithPath: outputPath))
    print("✓ \(job.outputName).png  crop=\(cropW)x\(cropH) -> draw=\(Int(drawW))x\(Int(drawH)) @ (\(Int(drawX)), bottom=\(bottomAnchorTopDown))  bytes=\(pngData.count)")
}

for job in jobs {
    try processSprite(job)
}
print("Done processing \(jobs.count) sprites!")
