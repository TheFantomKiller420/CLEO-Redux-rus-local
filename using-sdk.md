## CLEO Redux SDK

SDK позволяет создавать новые скриптовые команды для любой игры, которую поддерживает CLEO Redux. Он не зависит от названия игры и базовой среды выполнения (CS или JS). На данный момент CLEO предоставляет SDK для языков C++ и Rust.

### Поддержка платформ

CLEO Redux предоставляет SDK как для 32-битных, так и для 64-битных игр. Между ними есть одно заметное отличие: на 32-битной платформе функции SDK `GetIntParam` и `SetIntParam` работают с 32-битными числами со знаком, тогда как на 64-битной платформе они работают с 64-битными числами со знаком (объявлено как тип `isize`).

### Структура плагина

Каждый плагин представляет собой динамическую библиотеку с расширением `.cleo`, которую необходимо поместить в `CLEO\CLEO_PLUGINS`. CLEO Redux сканирует этот каталог при запуске и загружает все файлы `.cleo`, используя функцию WinAPI `LoadLibrary`. Чтобы зарегистрировать обработчик для новой команды, плагин должен вызвать `RegisterCommand` в функции DllMain. Как только пользовательский скрипт встречает эту команду, CLEO Redux вызывает обработчик с одним аргументом, который является указателем на текущий контекст. Этот указатель необходимо использовать для вызова других методов SDK.

### Соглашение об именовании

Для 64-битных плагинов рекомендуется использовать `64` в именах (например, `myplugin64.cleo`).

### Небезопасные команды

Команды, использующие низкоуровневый WinAPI и потенциально способные нанести вред среде пользователя, должны быть явно зарегистрированы с помощью токена разрешения (третий аргумент `RegisterCommand`). Пользователь может запретить использование небезопасных команд в скриптах с помощью [настройки разрешений](https://github.com/cleolibrary/CLEO-Redux#permissions). На данный момент используются три токена разрешений: `mem`, `fs` и `dll`. Ими отмечаются команды, работающие с хост-процессом, пользовательскими файлами и внешними библиотеками.

### Командный интерфейс

CLEO Redux использует [Sanny Builder Library](https://library.sannybuilder.com), чтобы узнать интерфейс любой команды. Чтобы новая команда стала доступной в сценариях, файл JSON (`gta3.json`, `vc.json`, `sa.json`) должен иметь определение команды, включая имя, совпадающее со значением, которое плагин использует `RegisterCommand` с. Например. если подключаемый модуль регистрирует команду `SHOW_MESSAGE`, в файле JSON должна быть команда со свойством имени, установленным на `SHOW_MESSAGE`. Количество и порядок входных и выходных параметров в определении должны соответствовать порядку методов, используемых подключаемым модулем (т. е. `GetXXXParam` для каждого входного аргумента и `SetXXXParam` для каждого выходного аргумента).

#### Запрос кодов операций

Коды операций назначаются новым командам в Sanny Builder Library в зависимости от их доступности, сходства с существующими командами в других играх и других факторов. Чтобы запросить код операции, обратитесь к сопровождающим Sanny Builder Library на GitHub https://github.com/sannybuilder/library/issues.

#### Зачем использовать имена команд, а не идентификатор для поиска команды?

Одной из распространенных проблем с плагинами CLEO Library было то, что команды, созданные разными людьми, часто имели конфликты идентификаторов. Если два плагина добавляют команды с одинаковым идентификатором, использовать их оба невозможно. Использование строковых имен сводит к минимуму коллизии с пользовательскими плагинами, а также с собственными кодами операций. Определения библиотеки гарантируют, что каждая команда требует только доступный идентификатор. Также это помогает отслеживать и документировать плагины в одном месте.

### Версия SDK

Текущая версия `1`. Изменения в SDK увеличат это число на единицу.

### Соглашение о разрешении пути

Строковые аргументы, представляющие путь к каталогу или файлу, должны быть нормализованы с помощью функции SDK `ResolvePath`. Эта функция принимает путь и возвращает абсолютный путь, разрешенный по следующим правилам:

- абсолютный путь разрешается как есть
- путь, начинающийся с "CLEO/" или "CLEO\\", разрешается относительно каталога CLEO, который либо
  - {игра}\CLEO или
  - {пользователь}\AppData\Roaming\CLEO Redux\CLEO
- все остальные пути разрешаются относительно текущего рабочего каталога (каталог игры)


### Строковые аргументы

Строки, передаваемые в методы SDK имеют кодировку UTF-8.

Если сценарий использует целочисленное значение вместо ожидаемой строки, SDK обрабатывает это число как указатель на последовательность символов UTF-8, заканчивающуюся нулем, для чтения или на достаточно большой буфер для сохранения результата:

```js
IniFile.WriteString(0xDEADBEEF, "my.ini", "section", "key")
```

SDK прочитает строку с адреса `0xDEADBEEF` и запишет ее в ini-файл.

```
0AF4: read_string_from_ini_file 'my.ini' section 'section' key 'key' store_to 0xDEADBEEF
```

SDK прочитает строку из ini-файла и запишет ее по адресу `0xDEADBEEF`.

### C++ SDK

Пользовательские плагины могут вызывать методы, предоставляемые CLEO Redux, используя предоставленный файл `.lib`. Включите `cleo_redux_sdk.h` в свой проект DLL и свяжите двоичный файл с `cleo_redux.lib` (или `cleo_redux64.lib`, если целевая платформа x86_64), и вы сможете начать писать новые команды.

#### Пример

См. подключаемый модуль `IniFiles`, который включает проект для Visual Studio 2019. Он добавляет статический класс `IniFile` со следующими методами:

```ts
interface IniFile {
    ReadFloat(path: string, section: string, key: string): float | undefined;
    ReadInt(path: string, section: string, key: string): int | undefined;
    ReadString(path: string, section: string, key: string): string | undefined;
    WriteFloat(value: float, path: string, section: string, key: string): boolean;
    WriteInt(value: int, path: string, section: string, key: string): boolean;
    WriteString(value: string, path: string, section: string, key: string): boolean;
}
```

Дополнительную информацию см. в библиотеке Sanny Builder: https://library.sannybuilder.com/#/sa_unreal/classes/IniFile. Для использования класса `IniFile` требуется `fs` [разрешение](readme.md#разрешения).

### Rust SDK

Rust SDK uses similar to C++ interface with some extra wrapping methods to allow easily convert between C and Rust types. The header file is available as a [crate](https://crates.io/crates/cleo_redux_sdk) on crates.io. See the documentation [here](https://docs.rs/cleo_redux_sdk/latest/).

#### Пример

See the `Dylib` plugin. It adds a class `DynamicLibrary` with the following methods:

```ts
declare class DynamicLibrary {
    constructor(handle: number);
    static Load(libraryFileName: string): DynamicLibrary | undefined;
    free(): void;
    getProcedure(procName: string): int | undefined;
}
```

See more information in Sanny Builder Library: https://library.sannybuilder.com/#/sa_unreal/classes/DynamicLibrary. The usage of the `DynamicLibrary` class requires a `dll` [permission](README.md#permissions).

