# Yosuga and Haruka Table Creator
A tool created to conveniently translate the game _Yosuga no Sora_ or _Haruka na Sora_ in Excel spreadsheets. The reason for creating this project is simple: [_VNTextPatch_](https://github.com/arcusmaximus/VNTranslationTools/tree/main) does not work correctly when creating a table specifically for these two games.

Инструмент, созданный для того, чтобы удобно переводить игру _Yosuga no Sora_ или _Haruka na Sora_ в Excel-таблицах. Причина создания этого проекта проста: [_VNTextPatch_](https://github.com/arcusmaximus/VNTranslationTools/tree/main) работает некорректно в случае создания таблицы конкретно для этих двух игр.

# Usage
> It is mandatory to have [_Node.js_](https://nodejs.org/ru) installed on your computer to work with the program!

To use the application, follow these instructions:
1. Move all scenario files on the _KiriKiri_ engine (you can find them either in [English translation of your chosen game](https://trjr.wordpress.com/download/) or in [our project on rebuilding _Yosuga no Sora_ or _Haruka na Sora_ to _Ren'Py_](https://github.com/anatolytumbochkavn/haruka_renpy_port)) to the _scenario_ folder, and files with the _.rpy_ extension to the _rpy_scenario_ folder.
2. Navigate to the folder path at the command line and type _node create_table_ – you will get the finished Excel spreadsheets in the _excel_output_ folder. The first column will have the character names, the second column will have the English text, and the third column should be your translation.
3. After all tables will be filled, go to the same folder path and write _node read_table_ – you will get translated files with extension _.rpy_ in the _output_ folder.

> Для работы с программой обязательно иметь установленный на компьютере [_Node.js_](https://nodejs.org/ru)!

Для того чтобы использовать приложение, следуйте этим указаниям:
1. Перенесите все файлы сценария на движке _KiriKiri_ (найти их можно либо в [переводе выбранной вами игры на английский язык](https://trjr.wordpress.com/download/), либо в [нашем проекте по пересборке _Yosuga no Sora_ или _Haruka na Sora_ на _Ren'Py_](https://github.com/anatolytumbochkavn/haruka_renpy_port)) в папку _scenario_, а файлы с расширением _.rpy_ – в папку _rpy_scenario_.
2. Перейдите по пути к папке в командной строке и введите _node create_table_ – вы получите готовые Excel-таблицы в папке _excel_output_. В первой колонке будут имена персонажей, во второй – английский текст, а в третьей должен оказаться ваш перевод.
3. После того как все таблицы буду заполнены, перейдите по тому же пути к папке и напишите _node read_table_ – вы получите переведённые файлы с расширением _.rpy_ в папке _output_.
