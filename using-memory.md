Примечание. Это руководство предназначено для игр классической эпохи. Для получения информации об использовании класса Memory в Definitive Edition [нажмите здесь](./using-memory-64.md).

## Использование объекта памяти

Внутренний объект `Memory` предоставляет методы для доступа и управления данными или кодом в текущем процессе. Он имеет следующий интерфейс:

```ts
interface Memory {
    ReadFloat(address: int, vp: boolean): float;
    WriteFloat(address: int, value: float, vp: boolean): void;
    ReadI8(address: int, vp: boolean): int;
    ReadI16(address: int, vp: boolean): int;
    ReadI32(address: int, vp: boolean): int;
    ReadU8(address: int, vp: boolean): int;
    ReadU16(address: int, vp: boolean): int;
    ReadU32(address: int, vp: boolean): int;
    WriteI8(address: int, value: int, vp: boolean): void;
    WriteI16(address: int, value: int, vp: boolean): void;
    WriteI32(address: int, value: int, vp: boolean): void;
    WriteU8(address: int, value: int, vp: boolean): void;
    WriteU16(address: int, value: int, vp: boolean): void;
    WriteU32(address: int, value: int, vp: boolean): void;
    Read(address: int, size: int, vp: boolean): int;
    Write(address: int, size: int, value: int, vp: boolean): void;

    ToFloat(value: int): float;
    FromFloat(value: float): int;
    ToU8(value: int): int;
    ToU16(value: int): int;
    ToU32(value: int): int;
    ToI8(value: int): int;
    ToI16(value: int): int;
    ToI32(value: int): int;

    Translate(symbol: string): int;

    CallFunction(address: int, numParams: int, pop: int, ...funcParams: int[]): void;
    CallFunctionReturn(address: int, numParams: int, pop: int, ...funcParams: int[]): int;
    CallMethod(address: int, struct: int, numParams: int, pop: int, ...funcParams: int[]): void;
    CallMethodReturn(address: int, struct: int, numParams: int, pop: int, ...funcParams: int[]): int;
    Fn: {
        Cdecl(address: int): (...funcParams: int[]) => int;
        CdeclFloat(address: int): (...funcParams: int[]) => float;
        CdeclI8(address: int): (...funcParams: int[]) => int;
        CdeclI16(address: int): (...funcParams: int[]) => int;
        CdeclI32(address: int): (...funcParams: int[]) => int;
        CdeclU8(address: int): (...funcParams: int[]) => int;
        CdeclU16(address: int): (...funcParams: int[]) => int;
        CdeclU32(address: int): (...funcParams: int[]) => int;

        Stdcall(address: int): (...funcParams: int[]) => int;
        StdcallFloat(address: int): (...funcParams: int[]) => float;
        StdcallI8(address: int): (...funcParams: int[]) => int;
        StdcallI16(address: int): (...funcParams: int[]) => int;
        StdcallI32(address: int): (...funcParams: int[]) => int;
        StdcallU8(address: int): (...funcParams: int[]) => int;
        StdcallU16(address: int): (...funcParams: int[]) => int;
        StdcallU32(address: int): (...funcParams: int[]) => int;

        Thiscall(address: int, struct: int): (...funcParams: int[]) => int;
        ThiscallFloat(address: int, struct: int): (...funcParams: int[]) => float;
        ThiscallI8(address: int, struct: int): (...funcParams: int[]) => int;
        ThiscallI16(address: int, struct: int): (...funcParams: int[]) => int;
        ThiscallI32(address: int, struct: int): (...funcParams: int[]) => int;
        ThiscallU8(address: int, struct: int): (...funcParams: int[]) => int;
        ThiscallU16(address: int, struct: int): (...funcParams: int[]) => int;
        ThiscallU32(address: int, struct: int): (...funcParams: int[]) => int;
    }
}
```

### Чтение и запись значений

Группа методов доступа к памяти (`ReadXXX`/`WriteXXX`) может использоваться для чтения или изменения значений, хранящихся в памяти. Каждый метод предназначен для определенного типа данных. Чтобы изменить значение с плавающей запятой (которое в исходной игре занимает 4 байта), используйте `Memory.WriteFloat`, например:

```js
    Memory.WriteFloat(address, 1.0, false)
```

Где `address` — это переменная, хранящая адрес памяти, `1.0` — это значение для записи, а `false` означает, что нет необходимости изменять защиту памяти с помощью  `VirtualProtect` (адрес уже доступен для записи). 

Точно так же, чтобы прочитать значение из памяти, используйте один из методов `ReadXXX`, в зависимости от того, какой тип данных содержит адрес памяти. Например, чтобы прочитать 8-битное целое число со знаком (также известное как `char` или `uint8`), используйте `Memory.ReadI8`, например:

```js
    var x = Memory.ReadI8(address, true)
```

переменная `x` теперь содержит 8-битное целое значение в диапазоне (0..255). Чтобы показать возможные варианты, в этом примере в качестве последнего аргумента используется `true`, что означает, что атрибут защиты по умолчанию для этого адреса будет изменен на `PAGE_EXECUTE_READWRITE` перед чтением.

```js
    var gravity = Memory.ReadFloat(gravityAddress, false);
    gravity += 0.05;
    Memory.WriteFloat(gravityAddress, gravity, false);
```

Наконец, последние два метода `Read` и `Write` — это то, что другие методы используют под капотом. Они имеют прямую привязку к опкодам [0A8D READ_MEMORY](https://library.sannybuilder.com/#/gta3/CLEO/0A8D) и [0A8C WRITE_MEMORY](https://library.sannybuilder.com/#/gta3/CLEO/0A8C) и дают тот же результат. 

Параметр `size` в методе `Read` может быть только `1`, `2` или `4`. CLEO обрабатывает `value` как целое число со знаком, хранящееся в формате с прямым порядком байтов.

В методе `Write` допускается любой `size` больше `0`. Размеры `3` и `5` и далее могут использоваться только вместе с одним байтом `value`. CLEO использует их для заполнения непрерывного блока памяти, начиная с `address`, с заданным `value` (подумайте об этом как о `memset` в C++).

```js
    Memory.Write(addr, 0x90, 10, true) // "noping" 10 байт кода, начиная с адреса
```

**Обратите внимание, что для использования любого из методов чтения/записи требуется `mem` [разрешение] (readme.md#разрешения)**.


### Casting methods (ХЗ как адекватно перевести)

По умолчанию методы `Read` и `Write` обрабатывают данные как целочисленные значения со знаком. Это может быть неудобно, если память содержит значение с плавающей запятой в формате IEEE 754 или большое 32-битное целое число со знаком (например, указатель). В этом случае используйте методы приведения `ToXXX`/`FromXXX`. Они действуют аналогично оператору [reinterpret_cast](https://docs.microsoft.com/en-us/cpp/cpp/reinterpret-cast-operator?view=msvc-160) в C++.

Чтобы получить представление о том, чего ожидать от этих методов, см. следующие примеры:

```js
    Memory.FromFloat(1.0) => 1065353216
    Memory.ToFloat(1065353216) => 1.0
    Memory.ToU8(-1) => 255
    Memory.ToU16(-1) => 65535
    Memory.ToU32(-1) => 4294967295
    Memory.ToI8(255) => -1
    Memory.ToI16(65535) => -1
    Memory.ToI32(4294967295) => -1
```

В качестве альтернативы используйте соответствующие методы для чтения/записи значения в виде числа с плавающей запятой (`ReadFloat`/`WriteFloat`) или целого числа без знака (`ReadUXXX`/`WriteUXXX`).


### Вызов внешних функций

Объект `Memory` позволяет вызвать чужую (собственную) функцию по ее адресу одним из следующих способов:

- `Memory.CallFunction` - привязывается к [0AA5 CALL_FUNCTION](https://library.sannybuilder.com/#/gta3/CLEO/0AA5)
- `Memory.CallFunctionReturn` - привязывается к [0AA7 CALL_FUNCTION_RETURN](https://library.sannybuilder.com/#/gta3/CLEO/0AA7)
- `Memory.CallMethod` - привязывается к [CALL_METHOD](https://library.sannybuilder.com/#/gta3/CLEO/0AA6)
- `Memory.CallMethodReturn` - привязывается к [CALL_METHOD_RETURN](https://library.sannybuilder.com/#/gta3/CLEO/0AA8)


```js
    Memory.CallFunction(0x1234567, 2, 0, 1000, 2000)
```
where `0x1234567` is the address of the function, `2` is the number of arguments, `0` is the `pop` parameter (see below),  `1000` and `2000` are the two arguments passed into the function.

Note that legacy SCM implementation of the call commands require the arguments of the invoked function to be listed in reverse order. That's it, you would see the same call in SCM as:

```
0AA5: call 0x1234567 num_params 2 pop 0 2000 1000
```
where `2000` is the second argument passed to the function located at 0x1234567 and `1000` is the first one.


The third parameter (`pop`) in `Memory.CallFunction` defines the calling convention. When it is set to `0`, the function is called using the [stdcall](https://en.wikipedia.org/wiki/X86_calling_conventions#stdcall) convention. When it is set to the same value as `numParam`, the function is called using the [cdecl](https://en.wikipedia.org/wiki/X86_calling_conventions#cdecl) convention. Any other value breaks the code.

`Memory.CallFunctionReturn` has the same interface but additionally it writes the result of the function to a variable.

`Memory.CallMethod` invokes a method of an object:

```js
    Memory.CallMethod(0x2345678, 0x7001234, 2, 0, 1000, 2000)
```

The second parameter (`0x7001234`) is the object address. The `pop` parameter is always `0` (the method uses the [thiscall](https://en.wikipedia.org/wiki/X86_calling_conventions#thiscall) convention).

To call the method and get the result out of it, use `Memory.CallMethodReturn`.

Note that all arguments are read as 32-bit signed integers. If you need to provide an argument of the float type, use `Memory.FromFloat`, e.g.

```js
    Memory.CallFunction(0x1234567, 1, 1, Memory.FromFloat(123.456))
```

CLEO Redux supports calling foreign functions with up to 16 parameters.

**Note that usage of any of the call methods requires the `mem` [permission](README.md#Permissions)**.

#### Convenience methods with Fn object

`Memory.Fn` provides a lot of convenient methods for calling different types of foreign functions.

```ts
Fn: {
        Cdecl(address: int): (...funcParams: int[]) => int;
        CdeclFloat(address: int): (...funcParams: int[]) => float;
        CdeclI8(address: int): (...funcParams: int[]) => int;
        CdeclI16(address: int): (...funcParams: int[]) => int;
        CdeclI32(address: int): (...funcParams: int[]) => int;
        CdeclU8(address: int): (...funcParams: int[]) => int;
        CdeclU16(address: int): (...funcParams: int[]) => int;
        CdeclU32(address: int): (...funcParams: int[]) => int;

        Stdcall(address: int): (...funcParams: int[]) => int;
        StdcallFloat(address: int): (...funcParams: int[]) => float;
        StdcallI8(address: int): (...funcParams: int[]) => int;
        StdcallI16(address: int): (...funcParams: int[]) => int;
        StdcallI32(address: int): (...funcParams: int[]) => int;
        StdcallU8(address: int): (...funcParams: int[]) => int;
        StdcallU16(address: int): (...funcParams: int[]) => int;
        StdcallU32(address: int): (...funcParams: int[]) => int;

        Thiscall(address: int, struct: int): (...funcParams: int[]) => int;
        ThiscallFloat(address: int, struct: int): (...funcParams: int[]) => float;
        ThiscallI8(address: int, struct: int): (...funcParams: int[]) => int;
        ThiscallI16(address: int, struct: int): (...funcParams: int[]) => int;
        ThiscallI32(address: int, struct: int): (...funcParams: int[]) => int;
        ThiscallU8(address: int, struct: int): (...funcParams: int[]) => int;
        ThiscallU16(address: int, struct: int): (...funcParams: int[]) => int;
        ThiscallU32(address: int, struct: int): (...funcParams: int[]) => int;
    }
```

These methods is designed to cover all possible function signatures. For example, this code

```js
    Memory.CallMethod(0x2345678, 0x7001234, 2, 0, 1000, 2000)
```

can also be written as

```js
    Memory.Fn.Thiscall(0x2345678, 0x7001234)(1000, 2000)
```

Note a few key differences here. First of all, `Memory.Fn` methods don't invoke a foreign function directly. Instead, they return a new JavaScript function that can be stored in a variable and reused to call the associated foreign function many times with different arguments:

```js
    var myMethod = Memory.Fn.Thiscall(0x2345678, 0x7001234);
    myMethod(1000, 2000); // calls method 0x2345678 with arguments 1000 and 2000
    myMethod(3000, 5000); // calls method 0x2345678 with arguments 3000 and 5000
```

The second difference is that there are no `numParams` and `pop` parameters. Each `Fn` method figures them out automatically.

By default a returned result is considered a 32-bit signed integer value. If the function returns another type (a floating-point value, or a signed integer), use one of the methods matching the function signature, e.g.:

```js
    var flag = Memory.Fn.CdeclU8(0x1234567)()
```

This code invokes a `cdecl` function at `0x1234567` with no arguments and stores the result as a 8-bit unsigned integer value. 


### Finding Memory Addresses in re3 and reVC

Since `re3` and `reVC` use address space layout randomization (ASLR) feature, it can be difficult to locate needed addresses. CLEO Redux provides a helper function `Memory.Translate` that accepts a name of the function or variable and returns its current address. If the requested symbol is not found, the result is 0.

```js
    var addr = Memory.Translate("CTheScripts::MainScriptSize");

    // check if address is not zero
    if (addr) {
        showTextBox("MainScriptSize = " + Memory.ReadI32(addr, 0))
    }
```

At the moment `Memory.Translate` should only be used in `re3` and `reVC`. In other games you will be getting `0` as a result most of the time.