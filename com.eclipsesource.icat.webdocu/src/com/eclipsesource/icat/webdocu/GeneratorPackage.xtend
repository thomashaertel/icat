package com.eclipsesource.icat.webdocu

import org.eclipse.emf.ecore.EPackage
import java.time.format.DateTimeFormatter
import java.time.LocalDateTime
import org.eclipse.emf.ecore.EClass
import org.eclipse.emf.ecore.EEnum
import org.eclipse.emf.ecore.EDataType

class GeneratorPackage {
	static def String generate(EPackage ePackage) {
		'''	
			<!-- auto-generated from '«ePackage.name»' at «DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss").format(LocalDateTime.now)» -->
			<html>
				<head>
					<title>«ePackage.name»</title>
					<link href="../styles/docu.css" rel="stylesheet" type="text/css">
				</head>
				<body>
					<div class='head'>
						<div class='center'>
							<h1>Classes in Package «ePackage.name»</h1>
						</div>
					</div>
					<div class='center overview'>
						<img src='./overview.png' alt='You have to exort the diagram manually and put it into `doku/overview.png` .'>
					</div>
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
				</body>
			</html>
		'''
	}
}