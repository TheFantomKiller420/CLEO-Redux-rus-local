## CLEO не работает с re3 или reVC

Ознакомьтесь с [этой информацией](https://github.com/cleolibrary/CLEO-Redux#compatibility-with-re3-and-revc).

## Краш игры с CLEO на San Andreas: The Definitive Edition

- Убедитесь, что вы установили 64-битную версию Ultimate ASI Loader ([прямая ссылка на последний релиз](https://github.com/ThirteenAG/Ultimate-ASI-Loader/releases/download/x64-latest/version.zip)).
  - Поместите `version.dll` в (`GTA San Andreas - Definitive Edition\Gameface\Binaries\Win64`)
- make sure you run the latest CLEO Redux version (0.8.2 and above)
- delete config files from `Documents\Rockstar Games\GTA San Andreas Definitive Edition\Config\WindowsNoEditor`
- run the game (or Rockstar Games Launcher) as administrator

If CLEO can't create files in `GTA San Andreas - Definitive Edition\Gameface\Binaries\Win64` it will use another directory at `C:\Users\<your_usename>\AppData\Roaming\CLEO Redux`. There should be `cleo_redux.log` and the CLEO folder where all your scripts go.
