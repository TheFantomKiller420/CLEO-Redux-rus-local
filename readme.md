# CLEO Redux

[![Discord](https://img.shields.io/discord/911487285990674473?style=for-the-badge)](https://discord.gg/d5dZSfgBZr)
[![YouTube Channel](https://img.shields.io/badge/YouTube-Channel-FF0000?style=for-the-badge)](https://www.youtube.com/playlist?list=PLNxQuEFtVkeizoLEQiok7qzr1f0mcwfFb)

- [Начало](#начало)
	- [Что такое CLEO Redux?](#что-такое-cleo-redux)
	- [Поддерживаемые языки](#поддерживаемые-языки)
	- [Поддерживаемые релизы](#поддерживаемые-релизы)
	- [Связь с CLEO Library](#связь-с-cleo-library)
		- [Запуск CLEO Redux как отдельного ПО](#запуск-cleo-redux-как-отдельного-по)
		- [Запуск CLEO Redux в качестве дополнения к библиотеке CLEO](#запуск-cleo-redux-в-качестве-дополнения-к-библиотеке-cleo)

- [Установка](#установка)
	- [Первичная настройка](#первичная-настройка)
	- [Совместимость с re3 и reVC](#совместимость-с-re3-и-revc)
	- [Совместимость с The Trilogy: The Definitive Edition](#совместимость-с-the-trilogy-the-definitive-edition)
	- [Удаление](#удаление)

- [Конфигурация](#конфигурация)
	- [Общая конфигурация](#общая-конфигурация)
	- [Разрешения](#разрешения)
		- [Все](#все)
		- [Слабые](#слабые)
		- [Строгие](#строгие)
		- [Исключения](#исключения)

- [Лог](#лог)
	
- [Пользовательские сценарии](#пользовательские-сценарии)
	- [Добавление нового скрипта](#добавление-нового-скрипта)
	- [Удаление скрипта](#удаление-скрипта)
	- [Пользовательские команды](#пользовательские-команды)
	- [Написание CS-скриптов](#написание-cs-скриптов)
	- [Написание JS-скриптов](#написание-js-скриптов)
	- [Интеграция с Visual Studio Code](#интеграция-с-visual-studio-code)

- [Поддержка JavaScript](#поддержка-javascript)
	- [Предварительное условие](#предварительное-условие)
	- [Жизненный цикл скрипта](#жизненный-цикл-скрипта)
	- [Собственные команды](#собственные-команды)
		- [Класс ScriptObject против объекта](#класс-scriptobject-против-объекта)
		- [Мат. классы](#мат.-классы)
		- [Свободный интерфейс](#свободный-интерфейс)
		- [Примеры](#примеры)
	- [Импорт](#импорт)
	- [Пользовательские привязки](#пользовательские-привязки)
	- [Устаревший](#устаревший)

- [Пользовательский текст](#пользовательский-текст)

- [Особенности разработки](#особенности-разработки)
	- [Лог SCM](#лог-scm)
	- [Горячая перезагрузка](#горячая-перезагрузка)

- [Лицензия](#лицензия)

## Начало

### Что такое CLEO Redux?

CLEO Redux — это среда выполнения сценариев для игр эпохи GTA 3D. Это полноценный член семейства CLEO, который предоставляет знакомый опыт всем, кто использовал библиотеку CLEO для классической GTA San Andreas или ее повторные реализации для других игр. Основная цель CLEO — предоставить возможность легко настраивать игру с помощью многочисленных пользовательских скриптов.

Если вы новичок в CLEO, посетите [официальный сайт] (https://cleo.li/), чтобы найти больше информации об этом.

### Поддерживаемые языки

CLEO Redux поддерживает скомпилированные бинарные скрипты (`*.cs`) в родном формате SCM и простые текстовые скрипты (`*.js`), написанные на JavaScript.

CLEO Redux ориентируется на JavaScript как на основной язык для пользовательских скриптов. JavaScript — популярный язык программирования с богатой экосистемой и большим количеством доступной информации. Он свободен от ограничений и ловушек языка SCM, таких как отсутствие поддержки функций, массивов или малое количество переменных.

### Поддерживаемые релизы

Классические:

- GTA III 1.0
- GTA Vice City 1.0
- GTA San Andreas 1.0 (только с [CLEO 4.4](https://github.com/cleolibrary/CLEO4))

Ремастеры (The Trilogy):

- GTA III 1.0.0.14718
- GTA Vice City 1.0.0.14718
- San Andreas 1.0.0.14296, 1.0.0.14388, 1.0.0.14718 (Название обновления 1.03)

Подробнее см. [Часто задаваемые вопросы по окончательному изданию](https://github.com/TheFantomKiller420/CLEO-Redux/blob/master/the-definitive-edition-faq.md).

Остальные:

- re3 (см. [Сведения о совместимости](#compatibility-with-re3-and-revc))
- reVC (см. [Сведения о совместимости](#compatibility-with-re3-and-revc))

CLEO Redux поддерживает только ПК-версию каждой игры.

Для получения полной информации о поддерживаемых функциях [обратитесь к этой странице](https://github.com/cleolibrary/CLEO-Redux/wiki/Feature-Support-Matrix). Также существуют известные ограничения [перечислены здесь](unsupported.md).

### Связь с CLEO Library

CLEO — это общее название пользовательских библиотек, разработанных и созданных для GTA III, Vice City или San Andreas. Каждую версию можно найти и скачать [здесь](https://cleo.li/download.html). CLEO Redux — это _другая_ реализация CLEO, созданная с нуля, с несколькими отличительными особенностями, такими как единая кодовая база для всех игр или поддержка кода JavaScript.

На данный момент CLEO Redux не может рассматриваться как полноценная замена CLEO Library из-за отсутствия поддержки многих широко используемых CLEO-команд. Чтобы решить эту проблему и получить максимальную отдачу от двух библиотек, CLEO Redux поддерживает две разные стратегии использования.

CLEO Redux может работать как отдельное ПО или как дополнение к CLEO Library. В первом случае ваша директория с игрой будет содержать только файл `cleo_redux.asi` (или `cleo_redux64.asi`). Во втором случае в вашем каталоге с игрой будут и `cleo.asi` (или `III.CLEO.asi`, и `VC.CLEO.asi`), и `cleo_redux.asi` (или `cleo_redux64.asi`).

#### Запуск CLEO Redux как отдельного ПО

Как отдельное ПО CLEO Redux запускает скомпилированные скрипты и JavaScript и предоставляет доступ ко всем командам собственного скрипта. Он также предоставляет ограниченный набор [настраиваемых команд](#пользовательские-команды), обратно совместимых с библиотекой CLEO. Существующие CLEO-скрипты могут не работать, если они используют пользовательские команды (например, из стороннего плагина), не поддерживаемые CLEO Redux.

Этот режим не работает в классической GTA San Andreas.

#### Запуск CLEO Redux в качестве дополнения к библиотеке CLEO

В качестве дополнения CLEO Redux работает вместе с CLEO Library, делегируя ему всю заботу о пользовательских скриптах. Это означает, что все пользовательские скрипты и плагины, созданные для библиотеки CLEO, будут продолжать работать точно так же. CLEO Redux управляет только JS-скриптами. Все пользовательские команды становятся доступными для среды выполнения JavaScript, что означает, что вы можете использовать команды, которые в настоящее время не реализованы нативно в CLEO Redux, например, для [файлов](https://library.sannybuilder.com/#/gta3/classes/File) или [ динамические библиотеки](https://library.sannybuilder.com/#/gta3/classes/DynamicLibrary).

Этот режим работает в классической GTA III, GTA Vice City и GTA San Andreas, где существует библиотека CLEO.

## Установка

Если вы используете The Definitive Edition (GTA III, VC или SA):

- [Следуйте этому руководству](the-definitive-edition-faq.md#how-to-install-cleo-redux-in-the-definition-edition).

Для всех остальных игр:

- Скопируйте `cleo_redux.asi` в папку с игрой.

- Запустите игру

Примечание: CLEO Redux не изменяет игровые файлы. Он использует тот факт, что игра изначально загружает файлы `.asi` в качестве дополнений к библиотеке Miles Sound System. Никакого дополнительного ПО не требуется.

### Первичная настройка

Во время первого запуска игры может быть заметное отставание, так как CLEO Redux загружает файлы, необходимые для [поддержки JavaScript](#поддержка-javascript). При последующих запусках этого не произойдет.

Также в папке с игрой\* должна появиться новая папка с именем `CLEO`. Это основное место для всех CLEO-скриптов, плагинов и конфигов.

\*Если CLEO не может создать новые файлы в каталоге игры из-за отсутствия прав на запись, он использует альтернативный путь в `C:\Users\<ваше_имя_пользователя>\AppData\Roaming\CLEO Redux`. Там можно найти `cleo_redux.log` и каталог `CLEO`.

### Совместимость с re3 и reVC

CLEO Redux поддерживает только «Windows D3D9 MSS 32bit» версию `re3` или `reVC`.

При запуске на `re3` и `reVC` убедитесь, что в каталоге игры есть файл `re3.pdb` (для **re3**) или `reVC.pdb` (для **reVC**). Из-за динамического характера адресов памяти в этих реализациях CLEO Redux использует отладочную информацию, хранящуюся в файле PDB, для правильного определения своего местоположения.

### Совместимость с The Trilogy: The Definitive Edition

Проверьте [Часто задаваемые вопросы по окончательному изданию](the-definitive-edition-faq.md)

### Удаление

- Удалите `cleo_redux.asi` (или `cleo_redux64.asi`).
- Удалите папку `CLEO` (необязательно).
- Удалите `cleo_redux.log` (необязательно).

## Конфигурация

CLEO Redux предоставляет некоторые настраиваемые параметры в файле `CLEO\.config\cleo.ini`.

### Общая конфигурация

- `AllowCs` - при значении `1` CLEO загружает и выполняет файлы `*.cs`, расположенные в каталоге CLEO. Включено по умолчанию.
- `AllowJs` - при значении `1` CLEO загружает и выполняет файлы `*.js`, расположенные в каталоге CLEO. Включено по умолчанию.
- `AllowFxt` - при значении `1` CLEO загружает и [использует](#custom-text) файлы `*.fxt`, расположенные в каталоге CLEO\CLEO_TEXT. Включено по умолчанию.
- `CheckUpdates` - при значении `1` CLEO проверяет наличие нового обновления, доступного для скачивания, при запуске игры. Включено по умолчанию.
- `LogOpcodes` - при значении `1` CLEO регистрирует все выполненные опкоды в пользовательских скриптах. Этот журнал является частью файла `cleo_redux.log` (см. [Лог](#лог))
- `PermissionLevel` - устанавливает уровень разрешений для небезопасных операций (см. ниже). По умолчанию используется «слабый».

### Разрешения

CLEO Redux признает некоторые [пользовательские команды](#пользовательские-команды) (коды операций) небезопасными и требует от пользователя решить, запускать их или нет. Необработанный доступ к памяти процесса, загрузка внешних библиотек или выполнение сетевых запросов могут быть вредными и вызывать нежелательные побочные эффекты. Поэтому CLEO вводит уровни разрешений для запуска небезопасного кода.

Доступны четыре уровня:

#### Все

Допускаются любые небезопасные операции. Используйте это только в том случае, если вы доверяете сценариям, которые запускаете.

#### Слабые

Это уровень разрешений по умолчанию.

Никакая небезопасная операция не разрешена, если сценарий явно не запрашивает ее. В настоящее время для запроса разрешения имя файла сценария должно включать маркеры разрешений, заключенные в квадратные скобки.

Например, если скрипт хочет получить доступ к памяти через `0A8D READ_MEMORY`, имя файла должно содержать `[mem]`, т.е. `крутой спаунер[mem].cs`. Если файл называется по-другому, CLEO отвергает `0A8D`, и скрипт вылетает.

#### Строгие

Никакая небезопасная операция не разрешена, если сценарий явно не запрашивает ее (см. `"Слабые"`), а файл конфигурации CLEO разрешает этот тип операции в разделе `Разрешения`. 

Раздел разрешений в `cleo.ini` позволяет включать или отключать группы небезопасных операций с помощью токенов разрешений. Например,

```ini
mem=0
```

отключает все коды операций, связанные с памятью, даже если скрипт имеет токен `[mem]` в имени файла.

Примечание. Раздел `Permissions` в `cleo.ini` вступает в силу только в том случае, если `PermissionLevel` имеет значение `Strict`.

#### Исключения

Небезопасная работа не допускается.

## Лог

CLEO регистрирует важные события и ошибки в файле `cleo_redux.log` расположенном в папке с игрой (или `C:\Users\<ваше_имя_пользователя>\AppData\Roaming\CLEO Redux`, см. [Первичная настройка](#первичная-настройка) примечание). Этот файл перезаписывается при каждом запуске игры. Если у вас возникнут какие-либо проблемы при использовании CLEO Redux, начните исследовать основную причину с этого файла.

Чтобы транслировать события в вашем терминале во время тестирования скрипта, запустите:

```
tail -f cleo_redux.log
```

`tail` - это команда unix, поэтому необходима совместимая среда (например, Git Bash).

## Пользовательские сценарии

### Добавление нового скрипта

Обычно файл скрипта нужно просто скопировать в каталог `CLEO`. Для установки некоторых скриптов могут потребоваться дополнительные действия. В случае каких-либо проблем проверьте документацию скрипта или обратитесь к его автору. 

### Удаление скрипта

Удалите файл скрипта из каталога `CLEO`. Некоторые сценарии могут потребовать дополнительных действий для отмены установки. В случае каких-либо проблем проверьте документацию скрипта или обратитесь к его автору. 

### Пользовательские команды

Примечание: Следующие команды предназначены только для классических игр. Для The Definitive Edition [проверьте эту информацию](the-definitive-edition-faq.md#can-i-use-cleo-opcodes).

- 0A8C [WRITE_MEMORY](https://library.sannybuilder.com/#/gta3/CLEO/0A8C) (**UNSAFE** - требует `mem` разрешение)
- 0A8D [READ_MEMORY](https://library.sannybuilder.com/#/gta3/CLEO/0A8D) (**UNSAFE** - требует `mem` разрешение)
- 0A8E [INT_ADD](https://library.sannybuilder.com/#/gta3/CLEO/0A8E)
- 0A8F [INT_SUB](https://library.sannybuilder.com/#/gta3/CLEO/0A8F)
- 0A90 [INT_MUL](https://library.sannybuilder.com/#/gta3/CLEO/0A90)
- 0A91 [INT_DIV](https://library.sannybuilder.com/#/gta3/CLEO/0A91)
- 0A93 [TERMINATE_THIS_CUSTOM_SCRIPT](https://library.sannybuilder.com/#/gta3/CLEO/0A93)
- 0AA5 [CALL_FUNCTION](https://library.sannybuilder.com/#/gta3/CLEO/0AA5) (**UNSAFE** - требует `mem` разрешение)
- 0AA6 [CALL_FUNCTION_RETURN](https://library.sannybuilder.com/#/gta3/CLEO/0AA6) (**UNSAFE** - требует `mem` разрешение)
- 0AA7 [CALL_METHOD](https://library.sannybuilder.com/#/gta3/CLEO/0AA7) (**UNSAFE** - требует `mem` разрешение)
- 0AA8 [CALL_METHOD_RETURN](https://library.sannybuilder.com/#/gta3/CLEO/0AA8) (**UNSAFE** - требует `mem` разрешение)
- 0AB0 [IS_KEY_PRESSED](https://library.sannybuilder.com/#/gta3/CLEO/0AB0)

### Написание CS-скриптов

Используйте [Sanny Builder 3](https://sannybuilder.com) в режимах редактирования GTA III, GTA VC или GTA SA соответственно. Посетите [эту страницу](https://cleo.li/scripts.html) для получения дополнительной информации.

[Проверьте Часто Задаваемые Вопросы](the-definitive-edition-faq.md#how-do-i-compile-cleo-scripts-with-sanny-builder) для получения информации о поддержке CS в обновленных играх.

### Написание JS-скриптов

Используйте VS Code (рекомендуется) или любой редактор по вашему выбору. Создайте новый файл с расширением `.js` и поместите его в папку CLEO. Дополнительную информацию см. в разделе [Поддержка JavaScript](#поддержка-javascript).

Среда выполнения поддерживает сценарии в [стандарте ECMAScript 2020](https://262.ecma-international.org/11.0/). Это означает, что вы можете использовать самые последние функции JavaScript из коробки, такие как импорт, классы, стрелочные функции и т.д.

CLEO Redux — это не Node.js. Не ожидайте, что здесь будут доступны сокеты, операции с файловой системой или другие функции Node.js.

### Интеграция с Visual Studio Code

Посмотреть демонстрацию: https://youtu.be/jqz8_lGnG4g

CLEO Redux генерирует типизации для всех поддерживаемых команд, которые вы можете использовать при написании JavaScript в VS Code. Добавьте следующую строку в свой скрипт `*.js` чтобы получить полную поддержку автозаполнения:

Для `GTA III` или `re3`: 

```
/// <reference path=".config/gta3.d.ts" />
```

Для `Vice City` или `reVC`

```
/// <reference path=".config/vc.d.ts" />
```

Для `San Andreas`

```
/// <reference path=".config/sa.d.ts" />
```

Эта строка указывает VS Code, где искать определения команд для функции автозаполнения. Путь может быть относительным относительно файла сценария или быть абсолютным. [Дополнительную информацию](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-path-) на официальном портале TypeScript.

## Поддержка JavaScript

### Предварительное условие

Когда JavaScript включен, CLEO Redux требует определения команд с https://library.sannybuilder.com/. При первом запуске CLEO пытается загрузить их и поместить в вашу локальную директорию `CLEO/.config`. Если этого не произошло или вы не хотите, чтобы CLEO совершал сетевые вызовы, вручную скачайте необходимый файл (см. таблицу ниже) и поместите его в каталог `CLEO/.config`. 

| Игра                                     | Файл                                                                                                 | Минимальная требуемая версия |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------- |
| GTA III, re3                             | [gta3.json](https://github.com/sannybuilder/library/blob/master/gta3/gta3.json)                      | `0.200`                      |
| GTA VC, reVC                             | [vc.json](https://github.com/sannybuilder/library/blob/master/vc/vc.json)                            | `0.201`                      |
| GTA San Andreas (Классическая) 1.0       | [sa.json](https://github.com/sannybuilder/library/blob/master/sa/sa.json)                            | `0.202`                      |
| GTA III: The Definitive Edition          | [gta3_unreal.json](https://github.com/sannybuilder/library/blob/master/gta3_unreal/gta3_unreal.json) | `0.204`                      |
| Vice City: The Definitive Edition        | [vc_unreal.json](https://github.com/sannybuilder/library/blob/master/vc_unreal/vc_unreal.json)       | `0.205`                      |
| San Andreas: The Definitive Edition      | [sa_unreal.json](https://github.com/sannybuilder/library/blob/master/sa_unreal/sa_unreal.json)       | `0.209`                      |

### Жизненный цикл скрипта

Файл с кодом JavaScript должен иметь расширение `*.js` и содержать известные инструкции, как описано ниже. Скрипт может не иметь инструкций (пустой скрипт). Он запускается, как только начинается новая игра или загружается файл сохранения.

Скрипт завершается автоматически после выполнения последней инструкции. Среда выполнения также завершает зависшие сценарии, чтобы игра не зависала. Застрявший скрипт — это тот, которому потребовалось более 2 секунд для запуска с момента последней команды ожидания. Если это произошло, проверьте свои циклы, в некоторых из них отсутствует команда ожидания.

```js
while (true) {
  // meaningless infinite loop normally freezing the game
  // will be terminated after two seconds
}
```

Среда выполнения завершит этот скрипт. Чтобы этого избежать, добавьте команду ожидания

```js
while (true) {
  wait(250);
  // still meaningless, but does not freeze the game
}
```

### Собственные команды

CLEO Redux поддерживает все внутриигровые команды (коды операций) в форме класса, как определено в библиотеке Sanny Builder.

#### Класс ScriptObject против объекта

Библиотека Sanny Builder определяет статический класс `Object` для группировки команд, позволяющих создавать и управлять трехмерными объектами в игре. В то же время в JavaScript есть [собственный класс Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) со своими методами.

Чтобы не смешивать их, CLEO Redux использует класс `ScriptObject` вместо класса `Object` из библиотеки с [тем же интерфейсом](https://library.sannybuilder.com/#/gta3/classes/Object).


