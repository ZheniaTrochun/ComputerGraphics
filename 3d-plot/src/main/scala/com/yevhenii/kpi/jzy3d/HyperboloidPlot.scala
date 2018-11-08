package com.yevhenii.kpi.jzy3d

import org.jzy3d.analysis.AbstractAnalysis
import org.jzy3d.chart.factories.AWTChartComponentFactory
import org.jzy3d.colors.Color
import org.jzy3d.maths.Coord3d
import org.jzy3d.plot3d.primitives.Scatter
import org.jzy3d.plot3d.rendering.canvas.Quality

object HyperboloidPlot extends AbstractAnalysis {

  val plot = createPlot()

  override def init(): Unit = {
    chart = AWTChartComponentFactory.chart(Quality.Advanced, "newt")
    chart.getScene.add(plot)
  }

  def createPlot(): Scatter = {
    new Scatter(getCoordinates(5, 5, (0, 10), (0, 10), 0.1).toArray, Color.BLUE)
  }

  private def getCoordinates(a: Double, b: Double, xRange: (Double, Double), yRange: (Double, Double), step: Double): Seq[Coord3d] = {

    //  z = 1 - ((x-a)^2 / a + (y-b)^2 / b)
    def z(x: Double, y: Double): Double = 1 - (Math.pow(x - a, 2) / a + Math.pow(y - b, 2) / b)

    for {
      x <- xRange._1 to xRange._2 by step
      y <- yRange._1 to yRange._2 by step
    } yield new Coord3d(x, y, z(x, y))
  }

}
