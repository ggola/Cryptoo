# Cryptoo
Holded challenge

<h2>Set up</h2>
<ul>
  <li>Git clone the repo</li>
  <li>In root directory run: <b>npm install</b></li>
  <li>Then run this to install pods: <b>cd iOS && pod install && cd ..</b></li>
  <li>Before running on android, in the android folder, add a file called <b>local.properties</b> and inside add just one line with the url of your Android skd.dir like in my case it is: <b>sdk.dir = /Users/giuliogola/Library/Android/sdk</b></li>
  <li>Then: <b>react-native run-ios</b> or <b>react-native run-android</b></li>
</ul>

<h2>Notes</h2>
<ul>
  <li>Redux used</li>
  <li>No expo</li>
  <li>Store middleware: Redux Thunk</li>
    <ul>
      <li>Pros: easy to implement</li>
      <li>Cons: not the best for app scaling</li>
      <li>Alternative to improve scalability: Redux-Saga</li>
    </ul>
</ul>

<h2>Functionalities</h2>
<ul>
  <li>User sees list of cryptos with some infos (open CoinGecko API: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd)</li>
  <li>User can swipe list cells, tap on start and add cryptos to its favourites.</li>
  <li>User can toggle drawer menu and see its Favourites and the 24h Gainers</li>
  <li>From Favourites users can swipe the cells, tap on full star and remove it from favourites list.</li>
</ul>

<h2>Offline functionalities</h2>
<ul>
  <li>Crypto data persisted via SQLite storage.</li>
  <li>User sees all crypto pairs with last saved available price.</li>
  <li>User notices that he/she is offline.</li>
  <li>User can see Favorites</li>
  <li>User can add/remove favourites.</li>
  <li>User can see 24h Gainers.</li>
</ul>

<h2>Remarks</h2>
Features work in all testing enviroments.</br>
Regarding the connectivity check (online, offline), here is a summary of the tests.
<ul>
  <li>iOS</li>
  <ul>
    <li>Simulator: NetInfo connectivity check detects state changes online to offline but fails to detect offline to online state change</li>
    <li>Real device (iPhone 6, iOS 12.4.3): NetInfo works fine</li>
  </ul>
  <li>Android</li>
  <ul>
    <li>Emulator Nexus 6 API 28, Android 9.0: NetInfo connectivity check detects connectivity state but fails to detect changes</li>
    <li>Real device: Not tested</li>
  </ul>
</ul>
