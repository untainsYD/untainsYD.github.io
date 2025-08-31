---
title: Google Summer of Code 2025
description: My journey and experiences with GSoC 2025
date: 2025-01-01
tags: [gsoc, open-source, programming, scala, doodle]
---

# Google Summer of Code 2025 Report

## Bringing Advanced Image Processing to Doodle: Convolution Filters and Bitmap Operations

- Project: [Add bitmap convolution operations](https://github.com/creativescala/doodle/issues/94)
- Student: [Yaroslav Doroshenko](https://github.com/untainsYD)
- Student's contributions: [Commits by Yaroslav Doroshenko](https://github.com/creativescala/doodle/commits?author=untainsYD)
- Mentor: [Noel Welsh](https://github.com/noelwelsh)
- Organization: [Scala Center](https://github.com/scalacenter)

### Project Overview

During Google Summer of Code 2025, I worked on implementing comprehensive image processing capabilities for the [Doodle](https://github.com/creativescala/doodle) library - a compositional graphics library for Scala. My project focused on bringing convolution filters and bitmap operations to Doodle's cross-platform architecture, supporting SVG, Java2D, and Canvas backends.

The project successfully delivered a unified, functional programming approach to image processing that maintains Doodle's core principles of compositionality and cross-platform compatibility.

### Key Achievements

#### 1. **Convolution Filters Architecture**
Designed and implemented a shared algebraic foundation for convolution operations following Doodle's Tagless Final pattern, enabling:
- Cross-platform filter operations
- Type-safe filter composition
- Backend-specific optimizations while maintaining consistent APIs

#### 2. **Complete SVG Filter Implementation**
Full support for SVG convolution filters including:
- Gaussian blur with configurable sigma
- Box blur for uniform smoothing
- Sharpen filters for edge enhancement
- Edge detection using convolution matrices
- Drop shadow with offset and blur
- Emboss effects for 3D appearance
- Custom convolution matrices

#### 3. **Java2D Backend Integration**
Implemented native Java2D convolution support with:
- Efficient `BufferedImage` manipulation
- Hardware-accelerated operations where available
- Simplified drop shadow (with roadmap for full implementation)

#### 4. **Bitmap Loading Infrastructure**
Created a comprehensive bitmap loading system across all backends:
- Unified `LoadBitmap` algebra
- Platform-specific implementations
- Convenient syntax methods for ease of use
- Error handling with proper effect types

### Technical Implementation Details

#### Shared Algebra Design

The filter system follows Doodle's layered architecture principle:

```scala
trait Filter[F[_], A] {
  def blur(sigma: Double): F[A]
  def boxBlur(radius: Int): F[A]
  def sharpen: F[A]
  def edgeDetect: F[A]
  def dropShadow(offsetX: Double, offsetY: Double, blur: Double, color: Color): F[A]
  def convolve(kernel: ConvolutionMatrix): F[A]
}
```

This design ensures:
- Backend independence through the tagless final pattern
- Compositional filter chains
- Type safety at compile time
- Consistent behavior across platforms

#### SVG Implementation Highlights

The SVG backend leverages native browser capabilities through `<filter>` elements:

```scala
// Example: Gaussian Blur in SVG
def blur(sigma: Double): Image[Algebra] =
  Image { implicit algebra =>
    val filterId = s"blur-${UUID.randomUUID}"
    algebra.applyFilter(
      FilterElement(
        id = filterId,
        primitives = List(
          GaussianBlur(stdDeviation = sigma)
        )
      )
    )
  }
```

<!-- SVG Example visualization would go here -->
<!-- TODO: Insert SVG example showing blur effect applied to a shape -->

#### Java2D Convolution Operations

The Java2D implementation uses native `ConvolveOp` for performance:

```scala
def convolve(kernel: ConvolutionMatrix): Picture[Algebra] =
  Picture { implicit algebra =>
    val kernelArray = kernel.toArray
    val convolveOp = new ConvolveOp(
      new Kernel(kernel.width, kernel.height, kernelArray),
      ConvolveOp.EDGE_NO_OP,
      null
    )
    algebra.applyConvolution(convolveOp)
  }
```

#### Bitmap Loading Architecture

The bitmap loading system provides a unified interface across platforms:

```scala
// Shared algebra
trait LoadBitmap[F[_]] {
  def loadBitmap(path: String): F[Picture]
}

// Platform-specific implementations
// SVG: Creates image references
// Java2D: Loads BufferedImage
// Canvas: Loads HTMLImageElement
```

### Pull Requests and Contributions

#### Core Implementations

1. **[PR #194](https://github.com/creativescala/doodle/pull/194)** - SVG Convolution Operations
   - Implemented complete SVG filter support
   - Created shared convolution algebra
   - Added comprehensive test suite
   - Documented all filter operations
   - Testing

2. **[PR #196](https://github.com/creativescala/doodle/pull/196)** - Bitmap Loading Foundation
   - Designed LoadBitmap algebra
   - Established error handling patterns
   - Created shared syntax layer
   - Testing

3. **[PR #197](https://github.com/creativescala/doodle/pull/197)** - Java2D LoadBitmap Implementation
   - Native BufferedImage support
   - File system integration
   - Resource management
   - Documented Java2D bitmap implementation
   - Testing

4. **[PR #198](https://github.com/creativescala/doodle/pull/198)** & **[PR #202](https://github.com/creativescala/doodle/pull/202)** - Canvas Backend Support
   - HTMLImageElement to Picture conversion
   - Browser-based image loading
   - Async operation handling
   - Documented Canvas bitmap implementation
   - Testing

5. **[PR #209](https://github.com/creativescala/doodle/pull/209)** - Java2D Filter Support
   - Native convolution operations
   - Performance optimizations
   - Initial drop shadow implementation
   - Testing

6. **PR coming soon** - Canvas Filter Support
   - Native convolution operations via pixel manipulation
   - Initial drop shadow implementation
   - Testing

#### Refinements

7. **[PR #204](https://github.com/creativescala/doodle/pull/204)** - API Refinements
   - Consistent naming conventions
   - Improved method signatures
   - Enhanced type inference

8. **[PR #207](https://github.com/creativescala/doodle/pull/207)** - SVG Bitmap References
   - Complete SVG image reference implementation
   - Cross-origin resource handling
   - Comprehensive documentation
   - Testing

9. **[PR #208](https://github.com/creativescala/doodle/pull/208)** - Convenience Methods
   - Backend-specific helper functions
   - Simplified API for common operations
   - Enhanced developer experience
   - Testing

#### Documentation
- [Convolution Filters](https://www.creativescala.org/doodle/pictures/filter.html)
- [Bitmaps in SVG](https://www.creativescala.org/doodle/svg/bitmap.html)
- [Bitmaps in Canvas](https://www.creativescala.org/doodle/canvas/bitmap.html)
- Bitmaps in Java2d: *documentation update needed*

### Visual Examples with code

#### Blur Effects

Gaussian blur creates smooth, natural-looking blur effects by applying a Gaussian distribution to pixel weights.

```scala
val circleShape = circle(80).fillColor(Color.red)
val blurredCircle = circleShape.blur(5.0)
```

![Blur Effects Example](/images/blur.svg)

The argument to blur controls the intensity of the effect, as shown below.

![Blur Effects Example Secondary](/images/blurSecond.svg)

The `boxBlur` method provides an alternative blur implementation. Unlike Gaussian blur which creates a smooth falloff, box blur averages pixels uniformly within a square area:

```scala
val orangeCircle = circle(80).fillColor(Color.orange)
val boxBlurred = orangeCircle.boxBlur(5)
```

![Box Blur Effects Example](/images/blurBox.svg)

Box blur creates a uniform blur effect, while Gaussian blur produces a smoother, more natural result. However, box blur may be faster than Gaussian blur.

#### Sharpen

The sharpen method enhances edges and details.

```scala
val randomCircle: Random[Picture[Unit]] =
  for {
    pt <- (
      Random.double.map(r => Math.sqrt(r) * 100),
      Random.double.map(_.turns)
    )
      .mapN(Point.polar)
    r <- Random.int(15, 45)
    l <- Random.double(0.3, 0.8)
    c <- Random.double(0.1, 0.4)
    h = (pt.r * 0.35 / 100.0).turns
  } yield Picture
    .circle(r)
    .at(pt)
    .noStroke
    .fillColor(Color.oklch(l, c, h, 0.5))

val randomCircles = randomCircle.replicateA(200).map(_.allOn.margin(20)).run()

val sharpenedShape = randomCircles.sharpen(4.0)
```

![Sharpen Effects Example](/images/sharpen.svg)

The method's parameter controls the intensity of the effect. Values above 1.0 increase sharpness, while values between 0 and 1 reduce it.

#### Edge Detection

Edge detection highlights boundaries in images using convolution matrices that emphasize pixel differences.

```scala
val layeredShape = circle(60).on(square(100))
  .fillColor(Color.lightBlue)
  .strokeColor(Color.darkBlue)
  .strokeWidth(4)

val edgeDetected = layeredShape.detectEdges
```

![Edge Detection Effect Example](/images/edgeDetection.svg)

#### Emboss

The emboss method creates a 3D raised surface effect.

```scala
val concentricCircles = {
  def loop(count: Int): Picture[Unit] =
    count match {
      case 0 => Picture.empty
      case n =>
        Picture
          .circle(n * 15)
          .fillColor(Color.crimson.spin(10.degrees * n).alpha(0.7.normalized))
          .strokeColor(
            Color.red.spin(15.degrees * n).alpha(0.7.normalized)
          )
          .strokeWidth(4.0)
          .under(loop(n - 1))
    }

  loop(7)
}

val embossedShape = concentricCircles.emboss
```

![Emboss Effect Example](/images/emboss.svg)

#### Drop Shadow

Drop shadows add depth to graphics by creating offset, blurred copies behind the original image.

```scala
val starShape = star(5, 50, 25).fillColor(Color.gold)
val shadowedStar = starShape.dropShadow(
  offsetX = 8,
  offsetY = 8,
  blur = 4,
  color = Color.black.alpha(Normalized(0.5))
)
```

![Drop Shadow Effect Example](/images/dropShadow.svg)

#### Combining Effects

Filter effects can be chained to create complex transformations.

```scala
val hexagon = regularPolygon(6, 60)
  .fillColor(Color.crimson)
  .strokeColor(Color.white)
  .strokeWidth(3)

val multiFiltered = hexagon
  .blur(2.0)
  .sharpen(1.5)
  .dropShadow(10, 10, 3, Color.black.alpha(Normalized(0.4)))
```

![Combining Effects Example](/images/combining.svg)

The order of operations is important when combining filters. For example, blur before sharpen creates a different effect to sharpen before blur.

#### Custom Convolutions

Custom convolution matrices enable unique artistic effects like embossing, motion blur, and more.

```scala
import doodle.algebra.Kernel

// Custom emboss kernel
val customEmboss = Kernel(3, 3, IArray(
    -9, -2, 1,
    -2,  1, 2,
     1,  2, 9
  )
)

val shape = text("Convolution")
  .font(Font.defaultSerif.bold.italic.size(FontSize.points(36)))
  .fillGradient(
    Gradient.linear(
      Point(0, 0),
      Point(1, 1),
      List(
        (Color.purple, 0.0),
        (Color.hotPink, 0.5),
        (Color.orange, 1.0)
      ),
      Gradient.CycleMethod.NoCycle
    )
  )
  .strokeColor(Color.black)
  .strokeWidth(2)

val enhancedShape = shape.convolve(customEmboss)
```

![Custom Effects Example](/images/custom.svg)

Convolution kernels work by multiplying each pixel and its neighbors by the corresponding kernel values, then summing the results. Common kernel patterns include:
- Edge detection: negative values around a positive center
- Blur: all positive values that sum to 1
- Sharpen: negative values around a center value greater than the sum of the neighbors


### Documentation Contributions

Created comprehensive documentation for:
- `docs/src/pages/canvas/bitmap.md` - Canvas bitmap operations guide
- `docs/src/pages/svg/bitmap.md` - SVG bitmap and filter documentation
- API documentation for all new algebras and methods
- Example code demonstrating filter composition

### Testing Strategy

Implemented thorough testing across all backends:
- Unit tests for individual filter operations
- Integration tests for filter composition
- Documentation based end-to-end testing
- Cross-platform consistency tests
- Performance benchmarks for convolution operations

### Remaining Work and Future Roadmap

#### Canvas Convolution Filters
Currently in progress, implementing:
- Convolutions and filters
- Fallback to 2D canvas context operations
- Consistent API with other backends

#### Enhanced Drop Shadow
Planned improvements for Java2D:
1. Extract alpha channel as shadow base
2. Apply configurable blur to shadow
3. Implement shadow offsetting
4. Add shadow colorization
5. Proper compositing of original over shadow

#### Kernel composition

Might be interesting to have a Kernel composition:

```scala
object ConvolutionKernel {
    implicit class KernelOps(kernel: ConvolutionKernel) {
        def *(scalar: Double): ConvolutionKernel
        def +(other: ConvolutionKernel): ConvolutionKernel
    }
}
```

#### Node.js environment integration for JS/Web (Canvas) testing
Integrate node.js environment into the project to get Canvas testing as in Java2d, instead of making it via documentation with live examples.

### Technical Insights and Learnings

#### Tagless Final Pattern
Working with Doodle's tagless final architecture taught me:
- How to design backend-agnostic APIs
- The power of higher-kinded types for abstraction
- Techniques for maintaining type safety across platforms

#### Cross-Platform Challenges
Addressed several cross-platform issues:
- Coordinate system differences between backends
- Color space handling variations
- Performance characteristics of different platforms
- Browser security restrictions for Canvas

#### Functional Image Processing
Demonstrated that functional programming principles work excellently for image processing:
- Composable filter chains
- Referential transparency for caching
- Effect tracking for IO operations
- Type-safe error handling

### Impact on the Doodle Ecosystem

This project significantly enhances Doodle's capabilities:
- **For Artists**: Rich filter effects for creative expression
- **For Educators**: Visual demonstrations of convolution mathematics
- **For Developers**: Type-safe, composable image processing
- **For the Community**: Foundation for future image processing features

### Acknowledgments

Special thanks to:
- My mentor, Noel Welsh for guidance on Doodle's architecture and Scala best practices
- The Creative Scala team for creating such an elegant graphics library
- The Google Summer of Code program for this opportunity
- The Scala community for valuable feedback and suggestions

### Conclusion

This GSoC project successfully brought professional-grade image processing capabilities to Doodle while maintaining its core principles of functional programming, composability, and cross-platform support. The implementation provides a solid foundation for future enhancements and demonstrates that complex image processing can be elegantly expressed in a functional paradigm.

The work completed during GSoC 2025 makes Doodle a more powerful tool for creative coding, education, and visualization in Scala, while maintaining the library's commitment to simplicity and type safety.

### Resources and Links

- [Doodle Repository](https://github.com/creativescala/doodle)
- [Doodle documentation](https://www.creativescala.org/doodle)
- [SVG Filter Specification](https://www.w3.org/TR/SVG11/filters.html)
- [Convolution Mathematics](https://en.wikipedia.org/wiki/Kernel_(image_processing))

---

*This report summarizes my contributions to the Doodle library during Google Summer of Code 2025. All code is available under the project's open-source license.*

[← Back to Posts](/posts)
