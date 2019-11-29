package asura.pea.service

import java.io.File
import java.nio.file.{Files, Paths, StandardOpenOption}

import akka.stream.scaladsl.Sink
import akka.util.ByteString
import asura.pea.PeaConfig
import asura.pea.PeaConfig._
import asura.pea.http.HttpClient
import asura.pea.model.DownloadResourceRequest
import com.typesafe.scalalogging.Logger

import scala.concurrent.Future

object ResourceService {

  val logger = Logger(getClass)

  def downloadResource(request: DownloadResourceRequest): Future[File] = {
    HttpClient.wsClient
      .url(request.url)
      .withMethod("GET")
      .stream()
      .flatMap(res => {
        val file = new File(s"${PeaConfig.resourcesFolder}${File.separator}${request.file}")
        if (file.getCanonicalPath.startsWith(PeaConfig.resourcesFolder)) {
          Files.createDirectories(Paths.get(file.getParent))
          val os = Files.newOutputStream(file.toPath, StandardOpenOption.CREATE, StandardOpenOption.WRITE)
          val sink = Sink.foreach[ByteString] { bytes =>
            os.write(bytes.toArray)
          }
          res.bodyAsSource
            .runWith(sink)
            .andThen { case result =>
              os.close()
              result.get
            }
            .map(_ => file)
        } else {
          Future.failed(new RuntimeException(s"Resource file must be in ${PeaConfig.resourcesFolder}"))
        }
      })
  }
}
