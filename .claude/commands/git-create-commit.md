# commitメッセージを作成

## 実行手順
1. Read @~/.claude/commands/guideline-read-code.md
2. 違反があれば作業を中断
3. `git status`でファイルを確認
4. 現在の差分を確認後、[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)に従い、適切なコミットの分割粒度を考える。別々の問題解決を1つのコミットにまとめないように注意 **重要**
5. コミットを提案して問題がないかチェックしてもらう $ARGUMENTS で -q -s などスキップの指定があれば即座にコミットをする
6. 承諾を得た場合はコミットを実行する


## 形式の指定
- type(scope): subject の形式に従う
- タイトルは40文字以内、本文は72文字程度で改行
- 動詞は原形を使用（add, fix, updateなど）
- scope は原則記述するが、適切なものがない場合は省略可
- prefixは小文字で始める
- コミットメッセージは日本語で記述する
- タイトルやメッセージでコードブロック(``)を活用する

## 実装とテストが含まれる場合の優先ルール
- 実装とテストコードが含まれている場合、typeはtestよりもfeat/fixを優先する
