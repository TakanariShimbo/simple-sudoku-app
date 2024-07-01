export class Texts {
  /**
   * @param {"jp" | "en"} lang
   */
  constructor(lang) {
    if (lang !== "jp" && lang !== "en") {
      throw new Error("Language in Texts should be 'jp' or 'en'!");
    }
    this._lang = lang;
  }

  /**
   * @param {Texts} texts
   * @returns {Texts}
   */
  static getAnotherTexts(texts) {
    return new Texts(texts.anotherLang);
  }
  /**
   * @returns {boolean}
   */
  get isJp() {
    return this._lang === "jp";
  }

  /**
   * @returns {boolean}
   */
  get isEn() {
    return this._lang === "en";
  }

  /**
   * @returns {string}
   */
  get lang() {
    return this._lang;
  }

  /**
   * @returns {string}
   */
  get anotherLang() {
    if (this.isEn) {
      return "jp";
    } else {
      return "en";
    }
  }

  /**
   * @returns {string}
   */
  get title() {
    if (this.isJp) {
      return "数独アプリ";
    } else {
      return "Sudoku App";
    }
  }

  /**
   * @returns {string}
   */
  get change() {
    if (this.isJp) {
      return "問題変更";
    } else {
      return "Change";
    }
  }

  /**
   * @returns {string}
   */
  get reset() {
    if (this.isJp) {
      return "初期化";
    } else {
      return "Reset";
    }
  }

  /**
   * @returns {string}
   */
  get solve() {
    if (this.isJp) {
      return "回答閲覧";
    } else {
      return "Solve";
    }
  }

  /**
   * @returns {string}
   */
  get undo() {
    if (this.isJp) {
      return "一手戻る";
    } else {
      return "Undo";
    }
  }

  /**
   * @returns {string}
   */
  get redo() {
    if (this.isJp) {
      return "一手進む";
    } else {
      return "Redo";
    }
  }

  /**
   * @returns {string}
   */
  get check() {
    if (this.isJp) {
      return "現状確認";
    } else {
      return "Check";
    }
  }

  /**
   * @returns {string}
   */
  get serverError() {
    if (this.isJp) {
      return "サーバーエラーが発生してます...";
    } else {
      return "A server error has occurred...";
    }
  }

  /**
   * @returns {string}
   */
  get probremChanged() {
    if (this.isJp) {
      return "問題が変更されました";
    } else {
      return "The probrem has been changed.";
    }
  }

  /**
   * @returns {string}
   */
  get tableReset() {
    if (this.isJp) {
      return "盤面がリセットされました";
    } else {
      return "The table has been reset.";
    }
  }

  /**
   * @returns {string}
   */
  get problemSolvedOk() {
    if (this.isJp) {
      return "問題は正常に解かれました";
    } else {
      return "The problem has been solved successfully.";
    }
  }

  /**
   * @returns {string}
   */
  get problemSolvedNg() {
    if (this.isJp) {
      return "これまでに入力された数字に誤りがあります";
    } else {
      return "There is a mistake in the numbers entered so far.";
    }
  }

  /**
   * @returns {string}
   */
  get progressCheckedOk() {
    if (this.isJp) {
      return "これまでに入力された数字は正しいです";
    } else {
      return "The numbers entered so far are correct.";
    }
  }

  /**
   * @returns {string}
   */
  get progressCheckedNg() {
    if (this.isJp) {
      return "これまでに入力された数字に間違いがあります";
    } else {
      return "There is a mistake in the numbers entered so far.";
    }
  }

  /**
   * @returns {string}
   */
  get tableUndoOk() {
    if (this.isJp) {
      return "盤面を一手戻しました";
    } else {
      return "The table has been undo.";
    }
  }

  /**
   * @returns {string}
   */
  get tableUndoNg() {
    if (this.isJp) {
      return "これ以上前の盤面がありません";
    } else {
      return "No more actions to undo.";
    }
  }

  /**
   * @returns {string}
   */
  get tableRedoOk() {
    if (this.isJp) {
      return "盤面を一手進めました";
    } else {
      return "The table has been redo.";
    }
  }

  /**
   * @returns {string}
   */
  get tableRedoNg() {
    if (this.isJp) {
      return "これ以上先の盤面がありません";
    } else {
      return "No more actions to redo.";
    }
  }
}
