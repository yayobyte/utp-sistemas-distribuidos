# Clase 07 — Arquitecturas en Sistemas Distribuidos

> **Resumen de repaso** · Fuente: `clases/clase07.txt` · Tema 2 del curso (Parcial 1)

---

## 🎯 Tema central

**¿Qué es la ARQUITECTURA de un sistema distribuido?**

> **Definición clave (para memorizar):** La arquitectura es la **organización lógica de los componentes** de una aplicación distribuida.

⚠️ **"Lógica" = no física.** Se puede definir una arquitectura **sin** saber:
- en qué máquina / nodo se va a instalar,
- con qué lenguaje se va a desarrollar,
- cómo se va a implementar.

---

## 🧱 1. El símil del arquitecto civil (para entender el concepto)

| Concepto civil | Equivalente en software |
|---|---|
| El arquitecto **diseña** (no construye) | El arquitecto de software define **qué** construir, no el **cómo** |
| Identifica **componentes** (cocina, baño, sala, pasillo) | Identifica **componentes** del sistema (módulos, servicios, roles) |
| Define el **patrón de interacción** (local ↔ pasillo) | Define cómo se **relacionan e interactúan** los componentes |
| El **ingeniero civil** lleva el diseño a la realidad (cargas, tensiones, normas) | El **equipo de desarrollo / infraestructura** implementa la solución |
| Todo proyecto tiene **restricciones y presupuesto** | Todo proyecto tiene restricciones (latencia, fallos, costo) |

### Ideas principales de la discusión en clase

- **Casa ≠ Apartamento** aunque ambos sean vivienda: cambia la **distribución** de los elementos.
  - En un apartamento la cocina va junto a la entrada; en una casa no.
  - En un apartamento no se diseña patio; en una casa sí.
  - Baño: 1 para 3 habitaciones en apartamento; en casa se suelen tener **baño social + baño privado por habitación**.
  - Casa de 2 pisos → 1er piso zonas comunes, 2do piso habitaciones.
- **Edificio de oficinas ≠ edificio de apartamentos**: en oficinas no hay habitaciones ni sala comedor; hay componentes distintos.
- **Centro comercial**: necesita baños, no pone una tienda de ropa junto a una de comidas, y necesita *varios* puntos de baños (uno por bloque/piso, no solo uno en el último piso).
- **Barrio residencial**: no tiene sentido hacer solo casas → hace falta colegio, iglesia, parque (zonas de esparcimiento).
- El arquitecto tiene **libertad de diseño** (ventanas ovaladas, de piso a techo, pequeñas...) pero siempre sobre una base de **patrones/reglas ya establecidos**.
- El arquitecto **no calcula física**: si pide algo imposible, dice **el ingeniero civil** "esto no se puede".

### Conclusión del símil

> La arquitectura define **qué** vamos a construir, **dónde** va cada componente y **cómo se relacionan**. **No** define el **cómo** se implementa.

---

## 🔗 2. Cuadrante de acoplamiento (EL CONCEPTO MÁS IMPORTANTE DE LA CLASE)

**Acoplamiento** = qué tan **dependientes / entrelazados** son los componentes entre sí.

### Tipos de acoplamiento

| Tipo | Define | Pregunta que responde |
|---|---|---|
| **Acoplamiento espacial** | La **ubicación / dirección / lugar** | ¿Dónde está el otro? ¿Necesito conocer su dirección para comunicarme? |
| **Acoplamiento temporal** | El **tiempo / simultaneidad** | ¿Ambos deben estar **activos al mismo instante** para que la comunicación ocurra? |

> Regla mnemotécnica: **espacial = dónde/lugar**, **temporal = cuándo/tiempo**.

### ¿Acoplado o desacoplado? — La matriz de ejemplos

| Canal / ejemplo | Acoplamiento espacial | Acoplamiento temporal |
|---|---|---|
| **Llamada telefónica** (fijo o celular) | 🔴 **Alto** — necesitas el número/dirección | 🔴 **Alto** — ambos deben estar en línea a la vez |
| **Mensaje de voz (WhatsApp)** | 🔴 **Alto** — necesitas número o @usuario | 🟢 **Bajo/Desacoplado** — puede responder horas después |
| **Carta postal física** | 🔴 **Alto** — necesitas la dirección completa | 🟢 **Desacoplado** — puede llegar hoy, mañana o en un mes |
| **Transmisión en vivo** (partido, Meet) | 🟢 **Bajo/Desacoplado** — el emisor no sabe dónde estás y sigue transmitiendo | 🔴 **Alto** — si no estás en el momento, pierdes el evento |
| **Anuncio en el tablón / Classroom** | 🟢 **Desacoplado** — publicas en un punto común, no sabes quién lo vio | 🟢 **Desacoplado** — lo ven cuando sea |

### Trade-off fundamental

| Mayor acoplamiento | Menor acoplamiento |
|---|---|
| ✅ Respuestas **instantáneas**, mayor rendimiento | ✅ Mayor **tolerancia a fallos**, mejor mantenibilidad |
| ✅ Más control, más predecible, más seguro | ✅ Los componentes no dependen de los otros |
| ✅ Comunicación más efectiva / feedback inmediato | ❌ Mayor **latencia** |
| ❌ Si **falla uno, falla todo** | ❌ No hay garantía de entrega, se pierde información |

> **Yayo (aporte clave):** *el acoplamiento no es ni bueno ni malo, depende de lo que se implemente.*
> **Profesor:** para sistemas distribuidos, **desacoplado es lo ideal**; para rendimiento, acoplado es mejor.

### Ejemplo cotidiano del desacoplamiento (profesor)

- Llamada a la secretaria: *"Mándeme el listado"* → sé que **ya sabe** y ya está trabajando. Acoplado, te da feedback.
- Mensaje de voz: *"Me tiene esto para mañana"* → puede que se le quede el celular y **el mensaje nunca llegó**. Sin garantía.

### ⚡ Patrón clave: "Push"

> **Notificaciones push** = arquitectura **editor/suscriptor en modo push**: no sé dónde estás (desacoplado espacial), **pero sé que el mensaje te llega en este instante** (acoplado temporal).

- El caso **acoplado espacial + acoplado temporal** → el **cuadrante ideal para sistemas distribuidos** (no puede existir en la práctica).
- El caso **desacoplado espacial + acoplado temporal** → exactamente las **push notifications**.

### ¿Dónde queda cada arquitectura?

| Cuadrante | Arquitectura / mecanismo | Cuándo se usa |
|---|---|---|
| Acoplado + Acoplado | **Cliente-Servidor** (variante tradicional) | Alto rendimiento, respuesta inmediata |
| Desacoplado esp. + Acoplado temp. | **Editor-Suscriptor** (push / comunicación a grupo) | Notificaciones, difusión |
| Desacoplado + Desacoplado | **MOM / Colas de mensajes**, memoria compartida distribuida | **Ideal para sistemas distribuidos** ✅ |
| ⚠️ Acoplado esp. + Desacoplado temp. | — | **Poco sentido práctico** ("sé dónde estás pero te lo mando después") |

- **Correo electrónico**: queda en un punto intermedio → se parece más al **tablón** (desacoplado). Lo que se hace es **dejar el mensaje en un buzón central** (Gmail/Hotmail) para que el otro lo recoja.

---

## 🏛️ 3. ¿Cuántas arquitecturas existen?

- **No existe una plantilla universal.** Cada proyecto es distinto → requiere un análisis independiente de **qué componentes, qué roles y qué patrones de interacción** necesita.
- Existen **muchas** arquitecturas (una por problema). El curso se centra en **4 clásicas ortogonales**.
- Se mencionaron de paso: **Monolito, SOA, microservicios, Serverless, Event Sourcing (event-driven), Capas/multinivel, Publicador-Suscriptor, Peer-to-Peer**.

> **Monolito ≠ mala práctica.** Muchos proyectos **sí** tienen sentido como monolito; hacer microservicios por defecto es **sobre-ingeniería**.

### Las 4 arquitecturas ortogonales del curso

| # | Arquitectura | Naturaleza |
|---|---|---|
| 1 | **Maestro-Trabajador** (Master-Worker) | Solo para sistemas distribuidos |
| 2 | **Cliente-Servidor** (Client-Server) | Aplicable a centralizados y distribuidos |
| 3 | **Editor-Suscriptor** (Publish-Subscribe) | Aplicable a ambos |
| 4 | **Peer-to-Peer** | Aplicable a ambos |

> **Ortogonales** = resuelven problemas completamente distintos entre sí. Aunque SOA, microservicios y Cliente-Servidor comparten conceptos, siguen siendo arquitecturas diferentes.
> Se tocaron también (de menor frecuencia): **Maestro-Trabajador**, arquitecturas **guiadas por la geometría de los datos** (matrices, comunicación entre vecinos) y **basadas en grafos** (dirigidos o no, tipo workflow). Son 100% distribuidas pero raras (99.9% no se usan).

---

## 🏗️ 4. Arquitectura MAESTRO–TRABAJADOR (detalle)

### Nomenclatura
En la literatura también se llama **Maestro-Esclavo** (Master-Slave), pero el profesor usa **Maestro-Trabajador** por razones éticas/sociales.

### Diagrama canónico

```
        ┌───────────┐
        │  MAESTRO  │ ← recibe TODAS las tareas del usuario
        └─────┬─────┘
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
┌────────┐┌────────┐┌────────┐
│ TRAB.1 ││ TRAB.2 ││ TRAB.3 │  → executes y notifican "terminé"
└────────┘└────────┘└────────┘
```

> Ejemplo del profesor: **4 componentes** = 1 maestro + 3 trabajadores.

### Roles

**MAESTRO (Master):**
1. Recibe **todas** las tareas del usuario.
2. **Distribuye** las tareas entre los trabajadores.
3. Si hay **más tareas que trabajadores**, las **encola/guarda** hasta que uno termine.
4. **Espera** la respuesta del trabajador.
5. Cuando todo está consolidado → **devuelve el resultado al usuario**.
6. Decide **qué trabajador** recibe cada tarea según su tipo/capacidad.

**TRABAJADOR (Worker):**
1. Recibe **una** tarea del maestro.
2. Se **dedica al 100%** a esa tarea (filosofía central: concentración de recursos).
3. Al terminar, **notifica al maestro** que ya terminó y está disponible.

### Reglas de la arquitectura

- ⚠️ **Toda la comunicación pasa por el maestro.** El usuario **nunca** habla directo con un trabajador; los trabajadores **tampoco** se hablan entre sí.
- Los trabajadores pueden ser **genéricos (hacen de todo)** o **especializados (uno para cada tipo de tarea)**. → **Es decisión del arquitecto** cuál usar.
- Los trabajadores son **"todoterráneos"**: cada uno puede repetir su tarea las veces que sea necesario.

### Acoplamiento: ALTO en ambos sentidos

| Tipo | Nivel | Razón |
|---|---|---|
| **Espacial** | 🔴 **Alto** | El maestro debe **saber dónde está** cada trabajador para enviarle tareas |
| **Temporal** | 🔴 **Alto** | Maestro y trabajador deben estar **activos/pendientes a la vez**, en ambos sentidos |

> Consecuencia directa: **el sistema NO es tolerante a fallos.**

---

## 🧯 5. Tolerancia a fallos en Maestro–Trabajador

### Fallo de un TRABAJADOR (tolerable)

El maestro se da cuenta de que el trabajador falló y tiene **2 opciones**:

1. **Reemplazarlo** por otro obrero disponible.
2. **Redistribuir** la tarea entre los trabajadores restantes.

✅ **El sistema sigue funcionando**, solo baja el rendimiento (menos recursos → tareas más lentas).

### Fallo del MAESTRO (punto crítico de fallo) ❌

**Punto crítico de fallo** = si ese componente falla, **el sistema completo falla**.

- Los trabajadores quedan **inútiles** (nadie les asigna tareas).
- **Lo peor:** las tareas que el maestro tenía asignadas y su estado **se pierden** — nadie más las conoce.

> **Punto crítico ≠ Cuello de botella.**
> - **Cuello de botella** = limita la **capacidad de procesamiento** (aquello es el número de **trabajadores**: si tengo 8, voy más rápido).
> - **Punto crítico** = su caída **tumba todo**, aunque no limite el rendimiento.

### Soluciones al punto crítico de fallo

| Solución | Descripción | Coste |
|---|---|---|
| **Replicación / Maestro en backup** | Un servidor de respaldo recibe **notificación** de cada tarea/avance del maestro principal; si el principal falla, el de respaldo continúa. | 💰 Se paga a un trabajador **por estar sentado sin trabajar**. |
| **Promoción / Elección** | Promover a uno de los trabajadores más experientes/capaz a **nuevo maestro**, mediante un **algoritmo de elección**. | Coste de implementar el algoritmo de elección. |

> **Conceptos relacionados (ver más adelante en el curso):** *fallos*, *tolerancia a fallos*, *idempotencia* (Yayo: registrar el identificador de la transacción para poder **repetir/reintentar** si falló).

---

## ✅ Checklist de repaso (autoevaluación)

- [ ] ¿Qué es arquitectura y por qué es **lógica** y no física?
- [ ] ¿Arquitecto = construye o diseña? ¿Quién lo implementa?
- [ ] Diferencias entre casa y apartamento como ejemplo de distribución de componentes.
- [ ] ¿Acoplamiento espacial y couplings temporal: definiciones y ejemplos.
- [ ] ¿Por qué un mensaje de voz es **acoplado espacialmente pero desacoplado temporalmente**?
- [ ] ¿Qué es una **push notification** y en qué cuadrante de acoplamiento cae?
- [ ] ¿Por qué **desacoplado es ideal** para sistemas distribuidos y acoplado es mejor en rendimiento?
- [ ] ¿Por qué **no existe una plantilla universal** de arquitectura?
- [ ] ¿Cuáles son las **4 arquitecturas ortogonales** del curso?
- [ ] Diagrama y roles de **Maestro-Trabajador**; ¿quién recibe todas las tareas?
- [ ] ¿Por qué los trabajadores pueden ser genéricos o especializados?
- [ ] ¿Qué es un **punto crítico de fallo** y en qué se diferencia de un **cuello de botella**?
- [ ] ¿Qué pasa si falla un trabajador? ¿Y si falla el maestro?
- [ ] Dos soluciones al punto crítico: **replicación** y **promoción/algoritmo de elección**.

---

## 🔗 Palabras clave para el Parcial 1

`Arquitectura` · `Organización lógica de componentes` · `Patrón de interacción` · `Rol / Función del componente` · `Acoplamiento espacial` · `Acoplamiento temporal` · `Desacoplamiento` · `Maestro-Trabajador (Master-Worker/Slave)` · `Punto crítico de fallo` · `Cuello de botella` · `Tolerancia a fallos` · `Fiabilidad` · `Monolito vs microservicios (sobre-ingeniería)` · `Editor-Suscriptor` · `Cliente-Servidor` · `Peer-to-Peer` · `MOM / Colas de mensajes` · `Idempotencia`
