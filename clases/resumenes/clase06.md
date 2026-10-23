# Clase 06: Los cinco objetivos de un sistema distribuido

> Fecha: 2026-09-24 · Fuente: `clases/clase06.txt` · Cierre del Tema 1

## Idea central

Para evaluar si un sistema distribuido es bueno, se revisan **cinco objetivos**: **transparencia, rendimiento, capacidad de crecimiento, carácter abierto y fiabilidad**. Ningún sistema real los cumple al 100%: hay porcentajes de cumplimiento, y el gran limitante casi siempre es el **presupuesto**.

## 1. Transparencia

El usuario **no debería saber cómo está implementado el sistema**: si es un servidor o cien, si es grid, clúster, nube o volunteer.

| Transparencia de… | El usuario no nota… | Ejemplo de clase |
|---|---|---|
| **Acceso** | Si el recurso es local o remoto. Se usa igual. | Entrar desde el PC de la oficina, desde la casa, desde la tablet o desde el celular. |
| **Ubicación / posición** | **Dónde está** el recurso. | No tener que saber que las notas están en el "servidor 5" y las solicitudes en el "servidor 7". Imprimir en la oficina desde la casa. |
| **Migración** | Que el servicio **se movió** de máquina. | Pasar de servidores propios a AWS sin cambiar la forma de entrar y sin "2 horas de mantenimiento". |
| **Concurrencia** | Que hay **otros usuarios** al mismo tiempo. | En Black Friday no debería ir más lento ni mostrar errores. |
| **Replicación** | Que hay **varias copias**. | Que guardar en la nube no se sienta más lento que guardar local. |
| **Fallos** | Que **algo falló**. | El sistema sigue funcionando si falla algo que no tiene que ver con lo que haces. |
| **Crecimiento / escalabilidad** | Que el sistema **creció** (1 o 100 instancias). | Mantener un **nivel de servicio constante**, ni mucho mejor ni peor según la hora. |
| **Heterogeneidad** | Que los nodos son distintos. | Un disco nuevo ya vuelve heterogéneo al clúster. |

> **Acceso = cómo llego al recurso. Posición = dónde está el recurso.**

- No siempre se logra ni siempre se quiere. **Java RMI** obliga a distinguir una llamada remota de una local, porque el programador debe ser consciente de la **latencia** y de la **posibilidad de fallo**.
- Por ahorrar, muchas veces se sacrifica: "solo el PC del gerente accede al sistema financiero" o "un servidor trabaja y el otro queda en standby".

**Tolerancia a fallos sin capacidad ociosa:** si compras dos servidores, **usa los dos** con un balanceador; si uno falla, el otro asume la carga (más lento, pero sigue). La teoría dice que **no te cases con un solo proveedor** de nube, ni de energía ni de internet (que no comparta redes con el otro). Pero dos contratos cuestan más.

## 2. Rendimiento

El sistema distribuido debe ser **tan bueno como uno centralizado**: Word en la nube debe permitir la misma productividad que Word instalado. Tiene dos vistas, que pueden darse por separado:

1. **Servicio multiusuario**: atender a muchos usuarios a la vez (si una máquina no da para 100, se monta otra y se reparten 50 y 50).
2. **Ejecución paralela**: partir una tarea grande en pedazos y procesarlos en paralelo.

Herramientas: **caché**, procesar parte en el cliente, más instancias. Programar para 10.000 usuarios es distinto que para uno.

## 3. Capacidad de crecimiento (escalabilidad)

¿El sistema puede **usar más recursos** cuando se agregan? Si hoy divide en 20 tareas, ¿podrá con 40 nodos?

**Síntoma: cuellos de botella.** Como una botella, un componente limita cuánto puede fluir.

| Tipo de cuello de botella | Ejemplo |
|---|---|
| Componente centralizado | La base de datos al 99% de CPU limita todo el sistema. |
| Tabla o archivo centralizado | 10.000 usuarios escribiendo el mismo archivo. |
| Algoritmo centralizado | 100 máquinas, pero solo una conoce el algoritmo. |

**Estrategias:**
- **Reparto**: distribuir las estructuras de datos entre varios nodos.
- **Replicación**: copias de datos, tablas o algoritmos en varias máquinas.
- **Procesar parte en el cliente**: usar el celular o el laptop para preprocesar.

**Reglas de los algoritmos descentralizados:**
- Ninguna máquina tiene el estado completo del sistema.
- Las decisiones se toman con información **local**.
- El fallo de una máquina no invalida el algoritmo.
- **No se asume un reloj global** (en Bitcoin cada nodo puede tener otra hora).

## 4. Carácter abierto

Usar servicios y protocolos **publicados y estándar**.
- Hay muchas alternativas para reemplazar componentes y se garantiza la **interoperabilidad**.
- Facilita la **migración** entre sistemas y la flexibilidad para extender.
- **Esconde la heterogeneidad** de hardware, SO y lenguajes.
- No buscar "el top" de un solo fabricante (el disco ultrarrápido de un único proveedor): el día que falla, solo hay una opción.

## 5. Fiabilidad (confianza)

El sistema debe **hacer las cosas bien** aunque haya fallos. Ejemplo: el presentador de Miss Universo que anunció a la ganadora equivocada. Un "ups, fue un error del sistema" destruye la confianza.

- **Evitar puntos únicos de fallo** (si ese componente cae, todo entra en caos).
- No confundir: **cuello de botella = limita el crecimiento**; **punto único de fallo = si cae, cae todo**.
- **Replicación** con su riesgo: mantener la **coherencia** entre réplicas.
  - **Activa**: se guarda en todas las copias al tiempo.
  - **Pasiva**: se guarda en una y luego se actualiza la otra.
- Operación correcta aunque haya **particiones de red**: que Netflix no te ponga la película de otro usuario, que un retiro no se le descuente a otra persona.
- La **trazabilidad** genera confianza: ver el estado de la compra en Temu o Mercado Libre.

## 6. ¿Qué sistema cumple los cinco?

Ninguno al 100%. **Uber o inDrive**: excelente rendimiento (nunca "está caído por muchos usuarios"), acceso desde cualquier lugar y cualquier dispositivo, muchas copias del servicio sin que lo notes. Son **decisiones de diseño**: cada sistema elige en qué objetivos ser más fuerte.

## 7. Mapa del curso

| Módulo | Tema |
|---|---|
| 1 | Introducción (terminado) |
| 2 | Arquitecturas |
| 3 | Comunicaciones |
| 4 | Sistemas de archivos distribuidos y paralelos |
| 5 | Servicios de nombres y de directorio |
| 6 | Gestión de procesos (balanceo de carga) |
| 7 | Sincronización y coordinación (relojes) |
| 8 | Tolerancia a fallos y seguridad |

La **memoria compartida distribuida** aparece en los textos de los 90, pero no se verá porque hoy no se usa.

**Taller asignado:** ejemplos reales de cada modelo de computación distribuida (Taller 2).

## Para el examen

- Los 5 objetivos: **transparencia, rendimiento, crecimiento, carácter abierto, fiabilidad**.
- Acceso = cómo llego; posición = dónde está; migración = se movió.
- Cuello de botella (limita el crecimiento) ≠ punto único de fallo (tumba todo).
- Estrategias de crecimiento: reparto, replicación, procesamiento en el cliente.
