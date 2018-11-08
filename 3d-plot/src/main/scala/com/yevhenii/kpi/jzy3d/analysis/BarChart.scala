package com.yevhenii.kpi.jzy3d.analysis

import com.yevhenii.kpi.jzy3d.HyperboloidPlot
import javafx.application.Application
import javafx.scene.Scene
import javafx.stage.Stage
import javafx.scene.chart.{BarChart => Chart}
import javafx.scene.chart.CategoryAxis
import javafx.scene.chart.NumberAxis
import javafx.scene.chart.XYChart
import org.jzy3d.maths.Coord3d

class BarChart extends Application {

  override def start(primaryStage: Stage): Unit = {
    val coordinates: Array[Coord3d] = HyperboloidPlot.plot.coordinates
    buildStage(primaryStage, coordinates)
  }

  private def buildStage(stage: Stage, coordinates: Array[Coord3d]): Unit = {

    stage.setTitle("Bar Chart")
    val xAxis = new CategoryAxis
    val yAxis = new NumberAxis
    val bc = new Chart[String, Number](xAxis, yAxis)
    bc.setTitle("Points")
    xAxis.setLabel("Range")
    yAxis.setLabel("Number of points")

    val series1 = new XYChart.Series[String, Number]

    val z = coordinates.map(_.z)
    val (max, min) = (z.max, z.min)

    val step = (max - min) / 10

    val range = min to max by step

    val data =
      for (i <- range.indices.init)
        yield s"${range(i)} - ${range(i + 1)}" -> z.count(p => p >= range(i) && p < range(i + 1))

    data.reverse.foreach(bar => series1.getData.add(new XYChart.Data(bar._1, bar._2)))

    val scene = new Scene(bc, 800, 600)
    bc.getData.add(series1)
    stage.setScene(scene)
    stage.show()
  }
}
