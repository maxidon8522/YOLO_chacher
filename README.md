<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# YOLOセルフレジ モック

学食向け「YOLOセルフレジ」の動作モックです。画像ファイル名から商品を判定し、認識結果確認、QR決済、会計完了まで遷移できます。

## 動作確認

**Prerequisites:** Node.js

1. 依存関係をインストール:
   `npm install`
2. 開発サーバーを起動:
   `npm run dev`
3. ブラウザで表示されたURLを開き、以下のファイル名の画像をアップロードして確認:
   - `udon_tempura_onigiri.jpg`: かけうどん、天ぷら、おにぎりが各1点
   - `tempura_tempura.jpg`: 天ぷらが2点
   - `kitsune_udon.jpg`: きつねうどんのみ
   - `tea_tea_onigiri.jpg`: お茶が2点、おにぎりが1点
4. 認識結果画面で `+` / `-` / 削除 / 商品追加を操作し、合計金額が更新されることを確認。
5. `QR決済へ進む` → `支払い完了` → `次の会計へ` の順に押し、初期画面に戻ることを確認。
