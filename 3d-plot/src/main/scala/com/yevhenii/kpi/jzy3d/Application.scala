package com.yevhenii.kpi.jzy3d

import org.jzy3d.analysis.AnalysisLauncher

object Application {

  def main(args: Array[String]): Unit = {
    AnalysisLauncher.open(HyperboloidPlot)
  }
}
