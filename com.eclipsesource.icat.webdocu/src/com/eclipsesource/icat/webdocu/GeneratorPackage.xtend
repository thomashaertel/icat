package com.eclipsesource.icat.webdocu

import org.eclipse.emf.ecore.EPackage
import java.time.format.DateTimeFormatter
import java.time.LocalDateTime
import org.eclipse.emf.ecore.EClass
import org.eclipse.emf.ecore.EEnum
import org.eclipse.emf.ecore.EDataType
import java.util.List

class GeneratorPackage {
	static def String generate(EPackage ePackage, List<String> cssFiles) {
		'''	
			<!-- auto-generated from '«ePackage.name»' at «DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss").format(LocalDateTime.now)» -->
			<html>
				<head>
					<title>«ePackage.name»</title>
					«FOR cssFile : cssFiles»
						<link href="styles/«cssFile».css" rel="stylesheet" type="text/css">
					«ENDFOR»					
					<script src="js/graph.js"></script>
				</head>
				<body>
					<div class='head'>
						<div class='center'>
							<h1>Classes in Package «ePackage.name»</h1>
						</div>
					</div>					
					<div id="sprotty-app" data-app="class-diagram" class="center content"></div>
					<div id="sprotty" class="center content sprotty"></div>
					<div class='center content'>
						<ol>
							«IF ePackage.EClassifiers.filter(EClass).length != 0»
							<li>
								<h3>Classes</h3>
								<ol>
									«FOR eClass : ePackage.EClassifiers.filter(EClass).sortBy[e|e.name]»
										<li>
											<a href="./«eClass.name».html">«eClass.name»</a>
										</li>
									«ENDFOR»
								</ol>
							</li>
							«ENDIF»
							«IF ePackage.EClassifiers.filter(EEnum).length != 0»
							<li>
								<h3>Enum</h3>
								<ol>
									«FOR eClass : ePackage.EClassifiers.filter(EEnum).sortBy[e|e.name]»
										<li>
											<a href="./«eClass.name».html">«eClass.name»</a>
										</li>
									«ENDFOR»
								</ol>
							</li>
							«ENDIF»
							«IF ePackage.EClassifiers.filter(EDataType).length != 0»
							<li>
								<h3>DataType</h3>
								<ol>
									«FOR eClass : ePackage.EClassifiers.filter(EDataType).reject(EEnum).sortBy[e|e.name]»
										<li>
											<a href="./«eClass.name».html">«eClass.name»</a>
										</li>
									«ENDFOR»
								</ol>
							</li>
							«ENDIF»
						</ol>
					</div>
					<script src="js/bundle.js"></script>
					<script>
						var container = EcoreDiagram.createEcoreDiagramContainer('sprotty');
						var modelSource = container.get('EcoreDiagramModelSource');
						modelSource.setModel(__graph__);
					</script>
				</body>
			</html>
		'''
	}
}