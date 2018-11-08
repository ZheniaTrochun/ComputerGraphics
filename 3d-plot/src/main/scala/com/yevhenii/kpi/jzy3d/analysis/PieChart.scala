package com.yevhenii.kpi.jzy3d.analysis

import com.yevhenii.kpi.jzy3d.HyperboloidPlot

import scala.collection.JavaConversions._
import javafx.application.Application
import javafx.collections.FXCollections
import javafx.scene.{Group, Scene}
import javafx.scene.chart.{PieChart => Chart}
import javafx.stage.Stage
import org.jzy3d.maths.Coord3d

import scala.collection.mutable.ListBuffer

class PieChart extends Application {
  override def start(primaryStage: Stage): Unit = {
    val coordinates: Array[Coord3d] = HyperboloidPlot.plot.coordinates
    buildStage(primaryStage, coordinates)
  }


  private def buildStage(stage: Stage, coordinates: Array[Coord3d]): Unit = {

    stage.setTitle("Bar Chart")
    stage.setHeight(500)
    stage.setWidth(500)

    val scene = new Scene(new Group())

    val z = coordinates.map(_.z)
    val (max, min) = (z.max, z.min)

    val step = (max - min) / 10

    val range = min to max by step

    val data =
      for (i <- range.indices.init)
        yield s"${range(i)} - ${range(i + 1)}" -> z.count(p => p >= range(i) && p < range(i + 1))

    val pieData = data.map(entry => new Chart.Data(entry._1, entry._2))

    val chart = new Chart(FXCollections.observableArrayList(bufferAsJavaList(ListBuffer(pieData.toList: _*))))

    chart.setTitle("Distribution of Z")

    scene.getRoot.asInstanceOf[Group].getChildren.add(chart)

    stage.setScene(scene)
    stage.show()
  }
}
