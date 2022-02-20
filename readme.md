# CLEO Redux

[![Discord](https://img.shields.io/discord/911487285990674473?style=for-the-badge)](https://discord.gg/d5dZSfgBZr)
[![YouTube Channel](https://img.shields.io/badge/YouTube-Channel-FF0000?style=for-the-badge)](https://www.youtube.com/playlist?list=PLNxQuEFtVkeizoLEQiok7qzr1f0mcwfFb)

- [Начало](#начало)
	- [Что такое CLEO Redux?](#что-такое-cleo-redux)
	- [Поддерживаемые языки](#поддерживаемые-языки)
	- [Поддерживаемые релизы](#поддерживаемые-релизы)
	- [Связь с CLEO Library](#связь-с-cleo-library)
		- [Запуск CLEO Redux как отдельного ПО]()
		- [Запуск CLEO Redux в качестве дополнения к библиотеке CLEO]()

- [Установка]()
	- [Первичная настройка]()
	- [Совместимость с re3 и reVC]()
	- [Совместимость с The Trilogy: The Definitive Edition]()
	- [Удаление]()

- [Конфигурация]()
	- [Общая конфигурация]()
	- [Разрешения]()
		- [Все]()
		- [Слабые]()
		- [Строгие]()
		- [Исключения]()

- [Лог]()
	- [Пользовательские сценарии]()
		- [Добавление нового скрипта]()
		- [Удаление скрипта]()
		- [Пользовательские команды]()
		- [Написание CS-скриптов]()
		- [Написание JS-скриптов]()
		- [Интеграция с кодом Visual Studio]()

- [Поддержка JavaScript]()
	- [Предварительное условие]()
	- [Жизненный цикл скрипта]()
	- [Собственные команды]()
		- [Объект класса Script против объекта]()
		- [Мат. классы]()
		- [Свободный интерфейс]()
		- [Примеры]()
	- [Импорт]()
	- [Пользовательские привязки]()
	- [Устаревший]()

- [Пользовательский текст]()

- [Особенности разработки]()
	- [Лог SCM]()
	- [Горячая перезагрузка]()

- [Лицензия]()

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

CLEO Redux может работать как отдельное программное обеспечение или как дополнение к CLEO Library. В первом случае ваша директория с игрой будет содержать только файл `cleo_redux.asi` (или `cleo_redux64.asi`). Во втором случае в вашем каталоге с игрой будут и `cleo.asi` (или `III.CLEO.asi`, и `VC.CLEO.asi`), и `cleo_redux.asi` (или `cleo_redux64.asi`).