package asura.pea.model

import asura.common.util.StringUtils

case class SingleHttpScenarioMessage(
                                      var name: String,
                                      var request: SingleRequest,
                                      var injections: Seq[Injection],
                                      val report: Boolean = true,
                                      var simulationId: String = null,
                                      var start: Long = 0L
                                    ) extends LoadMessage {

  def isValid(): Exception = {
    if (null == request || StringUtils.isEmpty(request.url)) {
      new RuntimeException("Empty request")
    } else if (null == injections || injections.isEmpty) {
      new RuntimeException("Empty injections")
    } else {
      null
    }
  }
}
