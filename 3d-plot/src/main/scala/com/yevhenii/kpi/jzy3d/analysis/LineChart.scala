package com.yevhenii.kpi.jzy3d.analysis

import com.yevhenii.kpi.jzy3d.HyperboloidPlot
import javafx.application.Application
import javafx.scene.Scene
import javafx.scene.chart.{CategoryAxis, NumberAxis, XYChart, LineChart => Chart}
import javafx.stage.Stage
import org.jzy3d.maths.Coord3d

class LineChart extends Application {

  override def start(primaryStage: Stage): Unit = {
    val coordinates: Array[Coord3d] = HyperboloidPlot.plot.coordinates
    buildStage(primaryStage, coordinates)
  }

  private def buildStage(stage: Stage, coordinates: Array[Coord3d]): Unit = {
    stage.setTitle("Line Chart")
    val xAxis = new CategoryAxis()
    val yAxis = new NumberAxis()
    xAxis.setLabel("Points")
    yAxis.setLabel("Point Monitoring")

    val lineChart = new Chart[String, Number](xAxis, yAxis)
    val series = new XYChart.Series[String, Number]

    coordinates.filter(_.x == 5).foreach(point => series.getData.add(new XYChart.Data(point.y.toString, point.z)))

    val scene = new Scene(lineChart, 800, 600)
    lineChart.getData.add(series)

    stage.setScene(scene)
    stage.show()
  }
}
