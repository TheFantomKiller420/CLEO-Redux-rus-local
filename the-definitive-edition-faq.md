Здесь вы можете найти ответы на часто задаваемые вопросы о поддержке ремастера The Trilogy.

- [Какие версии поддерживаются?](#какие-версии-поддерживаются)
- [Как установить CLEO Redux в The Definitive Edition?](#как-установить-cleo-redux-в-the-definitive-edition)
- [Что делать, если я не могу найти каталог CLEO?](#что-делать-если-я-не-могу-найти-каталог-cleo)
- [How to uninstall CLEO Redux?](#how-to-uninstall-cleo-redux)
- [Is there any difference from support of the classic games?](#is-there-any-difference-from-support-of-the-classic-games)
- [Can I use original opcodes?](#can-i-use-original-opcodes)
- [How do I know what commands can I use in JavaScript?](#how-do-i-know-what-commands-can-i-use-in-javascript)
- [Can I use CLEO opcodes?](#can-i-use-cleo-opcodes)
- [Can I work with the game memory or call the game functions?](#can-i-work-with-the-game-memory-or-call-the-game-functions)
- [How do I compile CLEO scripts with Sanny Builder?](#how-do-i-compile-cleo-scripts-with-sanny-builder)
- [I can't find an answer to my question here, where do I go?](#i-cant-find-an-answer-to-my-question-here-where-do-i-go)

### Какие версии поддерживаются?

- GTA III: The Definitive Edition **1.0.0.14718** 
- GTA Vice City: The Definitive Edition **1.0.0.14718** 
- San Andreas: The Definitive Edition **1.0.0.14296**, **1.0.0.14388**, **1.0.0.14718** 

### Как установить CLEO Redux в The Definitive Edition?

- Загрузите и установите [Ultimate ASI Loader x64](https://github.com/ThirteenAG/Ultimate-ASI-Loader/releases/download/x64-latest/version.zip) от [ThirteenAG](https://github.com/ThirteenAG) (поместите `version.dll` в каталог `Gameface\Binaries\Win64`).

- Скопируйте `cleo_redux64.asi` в тот же каталог.

- Запустите игру один раз, и вы должны создать новый каталог CLEO в том же каталоге. Если этого не произошло, проверьте ниже.

### Что делать, если я не могу найти каталог CLEO?

For many people running their game with CLEO Redux installed results in the immediate crash. It happens if there is no write permissions in the current directory (`Win64`). To remediate this issue CLEO fallbacks to using alternate path at `C:\Users\<your_username>\AppData\Roaming\CLEO Redux`. `cleo_redux.log` and the `CLEO` directory can be found there. See also the [troubleshooting guide](TROUBLESHOOTING.md).

### How to uninstall CLEO Redux?

- Delete `cleo_redux64.asi`.
- Delete the `CLEO` folder (optional).
- Delete the `cleo_redux.log` (optional)

### Is there any difference from support of the classic games?

There is. CLEO does not display the version in the game menu. Also CLEO can run only JS scripts in GTA III and GTA VC. In San Andreas both CS and JS scripts are supported.

### Can I use original opcodes?

Yes, you can. Refer to the Sanny Builder library https://library.sannybuilder.com/#/sa_unreal. Take a note that some opcodes have been changed from the classic games, so don't expect everything to work like it was in classic. If you run into an issue, find help in [our Discord](https://discord.gg/d5dZSfgBZr).

### How do I know what commands can I use in JavaScript?

After each game run, CLEO generates a d.ts file in the CLEO\.config directory. It's called gta3.d.ts, vc.d.ts or sa.d.ts depending on the game. This file lists all supported functions and methods that you can use in JavaScript code. 

To enable autocomplete in VS Code include the following line in your JS script:

```js
/// <reference path=".config/sa.d.ts" />
```

Update the file name accordingly depending on which game your script is for.

### Can I use CLEO opcodes?

Opcodes from CLEO Library (CLEO 4 or CLEO for GTA III and Vice City) are not supported. But CLEO Redux adds its own new opcodes for some operations.

  - 0C00 [IS_KEY_PRESSED](https://library.sannybuilder.com/#/sa_unreal/CLEO/0C00)
  - 0C01 [INT_ADD](https://library.sannybuilder.com/#/sa_unreal/CLEO/0C01)
  - 0C02 [INT_SUB](https://library.sannybuilder.com/#/sa_unreal/CLEO/0C02)
  - 0C03 [INT_MUL](https://library.sannybuilder.com/#/sa_unreal/CLEO/0C03)
  - 0C04 [INT_DIV](https://library.sannybuilder.com/#/sa_unreal/CLEO/0C04)
  - 0C05 [TERMINATE_THIS_CUSTOM_SCRIPT](https://library.sannybuilder.com/#/sa_unreal/CLEO/0C05)
  - 0C06 [WRITE_MEMORY](https://library.sannybuilder.com/#/sa_unreal/CLEO/0C06) (**UNSAFE** - requires `mem` permission)
  - 0C07 [READ_MEMORY](https://library.sannybuilder.com/#/sa_unreal/CLEO/0C07) (**UNSAFE** - requires `mem` permission)
  - 0C08 [CALL_FUNCTION](https://library.sannybuilder.com/#/sa_unreal/CLEO/0C08) (**UNSAFE** - requires `mem` permission)
  - 0C09 [CALL_FUNCTION_RETURN](https://library.sannybuilder.com/#/sa_unreal/CLEO/0C09) (**UNSAFE** - requires `mem` permission)

Note that Sanny Builder does not support these new opcodes out-of-the-box yet. To enable new opcodes in your CS scripts add the following lines on top of your script:

```
{$O 0C00=1,  is_key_pressed %1d% }
{$O 0C01=3,%3d% = %1d% + %2d% }
{$O 0C02=3,%3d% = %1d% - %2d% }
{$O 0C03=3,%3d% = %1d% * %2d% }
{$O 0C04=3,%3d% = %1d% / %2d% }
{$O 0C05=0,terminate_this_custom_script }
{$O 0C06=5,write_memory %1d% size %2d% value %3d% virtual_protect %4d% ib %5d% }
{$O 0C07=5,%5d% = read_memory %1d% size %2d% virtual_protect %3d% ib %4d% }
{$O 0C08=-1,call_function %1d% ib %2d% num_params %3d%}
{$O 0C09=-1,call_function_return %1d% ib %2d% num_params %3d%}
```

### Can I work with the game memory or call the game functions?

Yes, check the [Memory guide](using-memory-64.md)

### How do I compile CLEO scripts with Sanny Builder?

Use SA Mobile mode to compile CLEO scripts for San Andreas: The Definitive Edition. Note that CLEO Redux does not support CS scripts in GTA III: DE and VC: DE. JS scripts are supported in all games.

### I can't find an answer to my question here, where do I go?

- Check the main [readme file](README.md)
- Check the [troubleshooting guide](TROUBLESHOOTING.md).
- Check the [GitHub tickets](https://github.com/cleolibrary/CLEO-Redux/issues)
- Check the [Feature support page](https://github.com/cleolibrary/CLEO-Redux/wiki/Feature-Support-Matrix)
- Ask a question in [our Discord](https://discord.gg/d5dZSfgBZr)
