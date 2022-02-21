// раскомментируйте одну из них, чтобы включить автозаполнение в VS Code.
// /// <reference path=".config/gta3.d.ts" />
// /// <reference path=".config/vc.d.ts" />
// /// <reference path=".config/sa.d.ts" />

var VK_F4 = 115;
while (true) {
  wait(250);

  if (Pad.IsKeyPressed(VK_F4)) {
    Game.ActivateSaveMenu();
    wait(1000);
  }
}
