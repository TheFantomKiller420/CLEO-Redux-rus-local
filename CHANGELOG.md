### 0.9.3 - Apr 22, 2022

- CLEO можно [встроить](https://re.cleo.li/docs/en/embedding.html) и запускать на неизвестных хостах в режиме самообслуживания [см. демонстрацию](https://www.youtube.com/watch?v=rk2LvDt7UkI)
- новый установщик, который автоматически загружает дополнительные зависимости, такие как Ultimate ASI Loader и плагины (dylib, IniFiles или ImGuiRedux)
- поддержка организации скриптов и их зависимостей в подкаталогах внутри папки CLEO. Подробнее: https://re.cleo.li/docs/en/script-lifecycle.html#organizing-scripts

### 0.9.2 - Mar 04, 2022 
  
- Добавлена поддержка для The Definitive Edition Название обновления 1.04 (GTA III DE 1.0.0.15284, VC DE 1.0.0.15399, SA DE 1.0.0.15483) 
- Исправлена проблема со строковыми аргументами в командах вызова памяти в GTA San Andreas (https://github.com/cleolibrary/CLEO-Redux/issues/36) 
- Исправлена проблема с неработающими сценариями, если путь к каталогу с игрой заключен в квадратные скобки `[`, `]` 
  
### 0.9.1 - Feb 22, 2022

- Добавлен [SDK для разработки пользовательских команд](using-sdk.md) с помощью C++ и Rust
- Добавлена поддержка ошибочных команд в JS (также известных как команды `IF и SET` в сценариях SCM), они возвращают `undefined` при сбое, например.  `DynamicLibrary.Load` или `Char.IsInAnySearchlight`)
- Два новых плагина, добавляющих команды для работы с DLL (`dylib.cleo`) и INI-файлами (`IniFiles.cleo`) во всех поддерживаемых играх
- Добавлена константа `__dirname` в сценарии JS, которая разрешается в каталог текущего файла
- Добавлена новая функция [native](readme.md#пользовательские-привязки), которая вызывает команду сценария по имени (аналогично `op`):

```ts
/** Выполняет именованную команду с заданными аргументами */
declare function native<T>(name: string, ...args: any[]): T;
```

```js
const lib = native("LOAD_DYNAMIC_LIBRARY", "test.dll");
```

- Исправлена проблема с округлением чисел с плавающей точкой в GTA 3
- Исправлена проблема с неработающим импортом в JS, когда папка CLEO находится в каталоге AppData
- Исправлена ошибка, из-за которой команда `showTextBox` в San Andreas отображала мусорный текст
- Исправлена ошибка преобразования, когда команде `showTextBox` дается целочисленный аргумент
- Исправлена проблема с разрешениями сценариев, которые не проверялись для сценариев JS
- Исправлена проблема, когда объект, возвращаемый в результате выполнения некоторых команд (`Object.GrabEntityOnRope()`, `Heli.GrabEntityOnWinch()` и т.п.), не имел соответствующих полей, завернутых в экземпляр класса

**ЭТАПЫ УСТАНОВКИ**

https://github.com/cleolibrary/CLEO-Redux/blob/master/README.md#installation

**ОСНОВНЫЕ ИЗМЕНЕНИЯ**

| Игра                                | Файл                                                                                                 | Минимальная требуемая версия |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------- |
| GTA III, re3                        | [gta3.json](https://github.com/sannybuilder/library/blob/master/gta3/gta3.json)                      | `0.208`                      |
| GTA VC, reVC                        | [vc.json](https://github.com/sannybuilder/library/blob/master/vc/vc.json)                            | `0.210`                      |
| GTA San Andreas (Classic) 1.0       | [sa.json](https://github.com/sannybuilder/library/blob/master/sa/sa.json)                            | `0.210`                      |
| GTA III: The Definitive Edition     | [gta3_unreal.json](https://github.com/sannybuilder/library/blob/master/gta3_unreal/gta3_unreal.json) | `0.210`                      |
| Vice City: The Definitive Edition   | [vc_unreal.json](https://github.com/sannybuilder/library/blob/master/vc_unreal/vc_unreal.json)       | `0.212`                      |
| San Andreas: The Definitive Edition | [sa_unreal.json](https://github.com/sannybuilder/library/blob/master/sa_unreal/sa_unreal.json)       | `0.216`                      |

### 0.9.0 - Jan 23, 2022

- Добавлена поддержка JS-скриптов в **GTA III: The Definitive Edition (v1.0.0.14718)** и **Vice City: The Definitive Edition (v1.0.0.14718)** (применяются некоторые ограничения, см. [Поддержка функций ](https://github.com/cleolibrary/CLEO-Redux/wiki/Feature-Support-Matrix) для подробностей)
- Добавлена поддержка современного синтаксиса ES6+ (стрелочные функции, const/let, классы, дополнительные методы в стандартной библиотеке и т.д.), см. в качестве примера [скрипт Mines Drop](examples/mines-drop.js)
- Добавлена поддержка [импорта других скриптов и файлов JSON](readme.md#импорт)

Для 64-bit игр (The Trilogy):

- Теперь вы можете вызывать игровые функции с аргументами с плавающей точкой — благодаря @ThirteenAG
- Новая команда `Memory.CallFunctionReturnFloat`, похожая на `Memory.CallFunctionReturn`, но используемая для функций, возвращающих число с плавающей запятой:

```js
let x = Memory.FromFloat(123.456);
let y = Memory.FromFloat(456.555);
let groundZ = Memory.CallFunctionReturnFloat(0x100cc50, true, 2, x, y);
```

- Новый удобный метод `Memory.Fn.X64Float`, который можно использовать для функций, возвращающих число с плавающей точкой:

```js
let CWorldFindGroundZForCoord = Memory.Fn.X64Float(0x100cc50, true);
let x = Memory.FromFloat(123.456);
let y = Memory.FromFloat(456.555);
let groundZ = CWorldFindGroundZForCoord(x, y);
```

### 0.8.6 - Jan 12, 2022

- Добавлены команды [CALL_FUNCTION](https://library.sannybuilder.com/#/sa_unreal/CLEO/0C08) и [CALL_FUNCTION_RETURN](https://library.sannybuilder.com/#/sa_unreal/CLEO/0C09) в San Andreas: The Definitive Edition
- Добавлены удобные методы `Memory.Fn.X64` для [вызова функций из JavaScript на платформе x64](using-memory-64.md#вызов-внешних-функций)
- `showTextBox` теперь работает в San Andreas: The Definitive Edition
- Исправлена проблема с объектом FxtStore, не отображаемым в автозаполнении VS Code
- Исправлена проблема с неработающей отрисовкой текста в GTA San Andreas
- Исправлена проблема в сборках CLEO dev, из-за которой игра вылетала при запуске при проверке обновлений

#### ГЛАВНОЕ ИЗМЕНЕНИЕ

- Минимальная требуемая версия `sa_unreal.json` – `0.209`

### 0.8.5 - Jan 1, 2022

- Добавлена поддержка [статических файлов FXT] (using-fxt.md#статические-файлы-fxt) в папке `CLEO_TEXT`
- Добавить поддержку [частного хранилища FXT] (используя-fxt.md#fxtstore) в каждом сценарии JS
- Исправлена проблема, когда [права доступа к скриптам](readme.md#разрешения) не проверялись для CLEO-скриптов
- Исправлена проблема, когда игра могла вылетать при перезагрузке скрипта
- [Пользовательские опкоды CLEO](readme.md#совместимость-с-the-trilogy-the-definitive-edition) (`0C00`-`0C07`) теперь можно использовать в main.scm в San Andreas: DE

### 0.8.4 - Dec 17, 2021

- Для San Andreas: The Definitive Edition:

  - Новые коды операций `0C06 WRITE_MEMORY` и `0C07 READ_MEMORY`, а также соответствующие команды JavaScript: `Memory.Write` и `Memory.Read`.  [Прочитайте руководство](using-memory-64.md) для получения дополнительной информации
  - Исправлена проблема с кодами операций `0C01`, `0C02`, `0C03`, `0C04`, приводившая к сбою игры

- Для всех игр:
  - Улучшена стабильность JS-скриптов (https://github.com/cleolibrary/CLEO-Redux/issues/22)
  - Исправлена проблема, когда права доступа не проверялись для CLEO-скриптов

#### ОСНОВНЫЕ ИЗМЕНЕНИЯ

CLEO Redux для San Andreas: Definitive Edition теперь использует `sa_unreal.json` из https://github.com/sannybuilder/library.

| Игра                                | Минимальная требуемая версия |
| ----------------------------------- | ---------------------------- |
| GTA III, re3                        | `0.200`                      |
| GTA VC, reVC                        | `0.201`                      |
| GTA San Andreas (Classic) 1.0       | `0.202`                      |
| San Andreas: The Definitive Edition | `0.204`                      |

### 0.8.3 - Dec 8, 2021

- Исправлена критическая ошибка в планировщике сценариев CS, вызывающую ненормальное поведение (в основном приводящее к медленному выполнению) (https://github.com/cleolibrary/CLEO-Redux/issues/21)
- Исправлена проблема, из-за которой короны, созданные в CLEO-скриптах, не отображались (https://github.com/cleolibrary/CLEO-Redux/issues/23)

### 0.8.2 - Dec 4, 2021

- CLEO теперь использует каталог AppData, если в текущем каталоге игры нет прав на запись (см. примечание [Первоначальная настройка](readme.md#первичная-настройка))
- Добавлен свободный интерфейс для методов конструируемых сущностей. Посмотреть демонстрацию: https://www.youtube.com/watch?v=LLgJ0fWbklg
- Исправлена проблема, когда скрипт мог запускаться во время паузы в игре (при активном игровом меню)

### 0.8.1 - Dec 1, 2021

- Добавили поддержку San Andreas: The Definitive Edition v1.0.0.14718 (название обновления 1.03)

### 0.8.0 - Nov 25, 2021

- Новая 64-битная версия CLEO Redux (cleo_redux64.asi).  Она предназначена для работы только с обновленными играми
- [Первоначальная поддержка](readme.md#совместимость-с-the-trilogy-the-definitive-edition) для San Andreas: The Definitive Edition v1.0.0.14296 и v1.0.0.14388
- Исправлена проблема, когда скрипты могли не перезагружаться после загрузки файла сохранения

#### ИЗВЕСТНЫЕ НЕДОЧЁТЫ:

- Функция `showTextBox` не работает в JavaScript в San Andreas: The Definitive Edition
- CLEO не отображает свою версию в главном меню в San Andreas: The Definitive Edition

#### ОСНОВНЫЕ ИЗМЕНЕНИЯ

- Минимальная требуемая версия `gta3.json` – `0.100`
- Минимальная требуемая версия `vc.json` – `0.145`
- Минимальная требуемая версия `vc.json` – `0.175`

### 0.7.6 - Nov 18, 2021

- CLEO Redux теперь работает на Windows 7

### 0.7.5 - Nov 13, 2021

- fix: некоторые пользовательские команды могли иметь нестандартный порядок аргументов (например, [0AA4 GET_DYNAMIC_LIBRARY_PROCEDURE](https://library.sannybuilder.com/#/sa/CLEO/0AA4))
- fix: команды if и set имели некорректные определения в файле \*.d.ts

### 0.7.4 - Nov 11, 2021

- Игнорирование определения мобильных и консольных команд (исправлено https://github.com/cleolibrary/CLEO-Redux/issues/6)

#### ГЛАВНОЕ ИЗМЕНЕНИЕ

- Минимальная требуемая версия `vc.json` – `0.144`
- Минимальная требуемая версия `sa.json` – `0.168`

### 0.7.3 - Nov 8, 2021

- Убедитесь, что пользовательские скрипты имеют уникальные [внутриигровые имена](https://library.sannybuilder.com/#/vc/default/03A4), если первые 7 символов в именах их файлов совпадают (например, скрипты в файлах `spawner_a.  cs`, `spawner_b.cs`, `spawner_c.cs` теперь будут иметь имена `spawner`, `spawn01`, `spawn02` соответственно)
- fix: внутренняя ошибка адреса могла привести к тому, что JS-скрипт выполнил неправильную инструкцию

#### ГЛАВНОЕ ИЗМЕНЕНИЕ

- Минимальная требуемая версия `sa.json` – `0.167`

### 0.7.2 - Nov 4, 2021

- Добавлена константа `ONMISSION`, которую можно использовать для управления глобальным игроком в статусе миссии

```js
if (!ONMISSION) {
  showTextBox("Not on a mission. Setting ONMISSION to true");
  ONMISSION = true;
}
```

#### ОСНОВНЫЕ ИЗМЕНЕНИЯ

- Использование оператора `new` для статического объекта (для которого Sanny Builder Library не определяет конструктор, например, `Audio` или `Hud`) теперь вызывает ошибку:

```js
var hud = new Hud(); // error: Худ нельзя построить
```

- Минимальная требуемая версия `sa.json` – `0.166`

### 0.7.1 - Nov 2, 2021

- Новая статическая функция `Memory.Translate` для получения адреса памяти функции или переменной по ее имени (см. [документацию](using-memory.md#поиск-адресов-памяти-в-re3-и-revc))
- Новая функция `exit` для досрочного завершения скрипта

### 0.7.0 - Oct 30, 2021

- CLEO Redux теперь может работать как расширение библиотеки CLEO (см. [Отношение к библиотеке CLEO](readme.md#связь-с-cleo-library))
- CLEO Redux теперь может выполнять JavaScript в GTA San Andreas с установленным CLEO 4.4
- Новый параметр конфигурации `AllowCs` для управления сценариями `*.cs`
- fix: ini config игнорировался, если в `cleo.ini` отсутствовали параметры

#### ГЛАВНОЕ ИЗМЕНЕНИЕ

Файл основного дистрибутива CLEO Redux был переименован в `cleo_redux.asi`.  Во избежание конфликтов с ранее установленными версиями CLEO Redux вручную удалите старый файл `cleo.asi` из папки с игрой

### 0.6.2 - Oct 11, 2021

- Добавлены [CALL_FUNCTION](https://library.sannybuilder.com/#/gta3/CLEO/0AA5), [CALL_FUNCTION_RETURN](https://library.sannybuilder.com/#/gta3/CLEO/0AA7), [CALL_METHOD](https://library.sannybuilder.com/#/gta3/CLEO/0AA6), [CALL_METHOD_RETURN](https://library.sannybuilder.com/#/gta3/CLEO/0AA8). См. [Использование памяти](using-memory.md#вызов-внешних-функций) для получения дополнительной информации
- Обновлена типизация, чтобы включить ссылки на соответствующую документацию

### 0.6.1 - Oct 8, 2021

- Исправлен сбой в методах класса `Memory`

### 0.6.0 - Oct 8, 2021

- Добавлены комманды [INT_ADD](https://library.sannybuilder.com/#/gta3/CLEO/0A8E), [INT_SUB](https://library.sannybuilder.com/#/gta3/CLEO/0A8F), [INT_MUL](https://library.sannybuilder.com/#/gta3/CLEO/0A90), [INT_DIV](https://library.sannybuilder.com/#/gta3/CLEO/0A91)
- Математические операции теперь доступны через собственный объект JavaScript `Math`, где это возможно ([см. документацию](using-math.md))
- Новые статические методы в классе `Memory`.  См. [документацию](using-memory.md) для получения дополнительной информации

#### ОСНОВНЫЕ ИЗМЕНЕНИЯ

- `asFloat` был удален в пользу `Memory.ToFloat`
- Класс `Object` был переименован в `ScriptObject`, чтобы избежать конфликтов с собственным JavaScript Object
- Устаревшая команда isKeyPressed удалена. Вместо этого используйте `Pad.isKeyPressed`

### 0.5.3 - Oct 2, 2021

- Добавлена новая встроенная функция JavaScript `asFloat` для приведения целочисленного значения, возвращаемого командой `Memory.Read`, к числу с плавающей точкой ([IEEE 754](https://en.wikipedia.org/wiki/IEEE_754))

```js
var gravity = asFloat(Memory.Read(gravityAddress, 4, false)); // переменная гравитации теперь содержит значение с плавающей точкой
```

- Автоматически сгенерированные файлы `*.d.ts` теперь делают различие между целыми параметрами и параметрами с плавающей точкой, автозаполнение VS Code теперь отображает их с типами `int` и `float` соответственно
- Автоматически сгенерированные файлы `*.d.ts` теперь имеют `<reference no-default-lib="true"/>`, поэтому больше не нужно добавлять эту строку в файл скрипта, чтобы исключить неподдерживаемые команды JS из автозаполнения
- fix: `op` некорректно возвращал любое одиночное значение как целое число независимо от информации о типе
- fix: команда `showTextBox` отсутствовала в `cleo.log` с `logOpcodes=1`

### 0.5.2 - Sep 30, 2021

- CLEO теперь проверяет наличие обновлений и уведомляет в главном меню (можно отключить с помощью `Check Updates=0`)
- Команда `isKeyPressed` устарела, вместо нее используйте `Pad.IsKeyPressed`
- fix:  исправлена взаимоблокировка, вызывающая тайм-ауты в JS-скриптах

### 0.5.1 - Sep 28, 2021

- Добавлена поддержка `Boolean`, `null` и `undefined` в качестве аргументов команды `op`
- Разрешён произвольный размер в `0A8C WRITE MEMORY`, чтобы заполнить непрерывный блок памяти одним байтовым значением
- fix: после перезагрузки игры JS-скрипты могли дублироваться

### 0.5.0 - Sep 25, 2021

- Добавлена поддержка GTA III 1.0 и GTA VC 1.0
- Добавлена поддержка автоматически увеличивающихся переменных `TIMERA` и `TIMERB`
- Добавлены уровни разрешений для небезопасных кодов операций
- Добавлены два небезопасных кода операции: `0A8C WRITE_MEMORY` и `0A8D READ_MEMORY`
- fix: пользовательские опкоды не работали в main.scm
- fix: gosub не работал в CS скриптах
- fix: состояние гонки вызывало ложноположительные тайм-ауты для JS-скриптов

### 0.4.0 - Sep 2, 2021

- Добавлены привязки для всех опкодов в JS-скриптах
- CLEO теперь может генерировать файл `*.d.ts` для автозаполнения в VS Code.
- Добавлена горячая перезагрузка для файлов `*.js`
- fix: лог опкодов не работал даже с `LogOpcodes=1`

### 0.3.1 - Aug 21, 2021

- Добавлена функция `op` для выполнения любого кода операции из кода JavaScript
- Добавлена константа `GAME`, чтобы проверить текущую хост-игру
- CLEO теперь хранит свои настройки в `CLEO/.config/cleo.ini`, созданном при первом запуске.
- Поддержку JavaScript можно отключить с помощью параметра `AllowJs=0`

### 0.3.0 - Aug 17, 2021

- Добавлена эксперементальная виртуальная машина, выполняющая ECMAScript 5 (JavaScript)

### 0.2.1 - Aug 14, 2021

- При просмотре каталога CLEO запускаются/останавливливаются скрипты, если файл CS был добавлен или удален

### 0.2.0 - Aug 13, 2021

- Добавлена горячая перезагрузка

### 0.1.2 - Aug 13, 2021

- Добавлена поддержка reVC

### 0.1.1 - Aug 12, 2021

- Первый выпуск
