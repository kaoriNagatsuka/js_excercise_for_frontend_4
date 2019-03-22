// グローバル空間に変数や関数をセットしないために即時関数で閉じ込めている
(() => {
  // 入力したTodoタスクの一覧を保持する配列を定義する

  const todos = [];

  // HTMLのID値を使って以下のDOM要素を取得する
  //   - テキストボックス(input[type="text"])
  //   - 追加ボタン(button要素)
  //   - Todoリストを一覧表示するul要素

  const textBox = document.getElementById('input-todo-box');
  const addButton = document.getElementById('add-button');
  const ulElement = document.getElementById('todo-list')

  //「追加」ボタンがクリックされたときの処理を実装する
  //   - テキストボックスに入力されたテキストをTodoリスト一覧に追加する
  //   - テキストボックスの中を空にする

  addButton.addEventListener('click', (event) => {
    // 配列に値をセット
    todos.push(textBox.value);
    textBox.value = '';
    showTodo();
  });

  // 「todos」の中身を一覧表示する
  //    - ul要素にli要素を追加して、li要素内にtodoタスクの内容を表示する
  //    - li要素内に削除ボタンを配置して、削除ボタンをクリックしたら対応するタスクを削除する
  function showTodo() {
    // 一度全てのliを削除
    while (ulElement.firstChild) {
      ulElement.removeChild(ulElement.firstChild);
    }
    // 全てのliを書く
    todos.forEach((todo, index) => {
      const liElement = document.createElement('li');
      const liIndex = index + 1;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '削除';
      //テキストをセット
      liElement.textContent = `${liIndex} : ${todos[index]}`;
      //ulElementに追加
      ulElement.appendChild(liElement);
      //削除ボタンを追加
      liElement.appendChild(deleteButton);
      //削除ボタンをクリックしたら対応するタスクを削除する
      deleteButton.addEventListener('click', (event) => {
        deleteTodo(index);
      });
    });
  }

  // Todo情報を表すli要素(showTodo関数で作成される要素)の中にある削除ボタンをクリックしたら実行される。
  //   - todosから対応するtodo情報を削除する
  //   - 引数はindexを受け取る(インデックス番号)
  //   - 削除後はshowTodosを実行して、Todoリストを整理する
  function deleteTodo(index) {
    // 指定されたindex番目のtodo情報を削除
    todos.splice(index, 1);
    //todoリストを整理
    showTodo();
  }
})();