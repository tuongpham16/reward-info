import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import treeContent from './lp-airdrop-tree.json'
function App() {
  const [tree, setTree] = useState<StandardMerkleTree<any>>();
  const [addr, setAddr] = useState('')
  const [btc, setBtc] = useState('')
  const [eth, setEth] = useState('')
  const [bnb, setBnb] = useState('')
  const [cake, setCake] = useState('')
  const [usdt, setUsdt] = useState('')
  const [busd, setBusd] = useState('')
  const [id, setId] = useState('')
  const [prof, setProf] = useState<string>()
  useState([tree, setTree])

  useEffect(() => {
    setTree(StandardMerkleTree.load(treeContent as any));
  }, []);

  const getMerkleProof = () => {
    try {
      const _prof = tree?.getProof([id, addr, btc, eth, bnb, cake, usdt, busd]);
      console.log(_prof);
      if (_prof) {
        setProf(`[${_prof.join(",")}]`);
      } else {
        setProf('NOT FOUND');
      }
    }
    catch {
      setProf('NOT FOUND');
    }
  }


  return (
    <div className="App">
      <form>

        <div className='row'>
          <span>Id:</span>

          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className='row'>
          <span>Address: </span>
          <input
            type="text"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
          />

        </div>

        <div className='row'>
          <span>BTC:</span>

          <input
            type="text"
            value={btc}
            onChange={(e) => setBtc(e.target.value)}
          />
        </div>

        <div className='row'>
          <span>ETH:</span>

          <input
            type="text"
            value={eth}
            onChange={(e) => setEth(e.target.value)}
          />
        </div>

        <div className='row'>
          <span>BNB:</span>

          <input
            type="text"
            value={bnb}
            onChange={(e) => setBnb(e.target.value)}
          />
        </div>

        <div className='row'>
          <span>CAKE:</span>

          <input
            type="text"
            value={cake}
            onChange={(e) => setCake(e.target.value)}
          />
        </div>

        <div className='row'>
          <span>USDT:</span>

          <input
            type="text"
            value={usdt}
            onChange={(e) => setUsdt(e.target.value)}
          />
        </div>

        <div className='row'>
          <span>BUSD:</span>

          <input
            type="text"
            value={busd}
            onChange={(e) => setBusd(e.target.value)}
          />
        </div>


        <div>-------------------------------------</div>

        <button type='button' onClick={() => getMerkleProof()}>Get Merkle Proof</button>
        <div>-------------------------------------------------------</div>
        <div>
          <textarea value={prof}></textarea>
        </div>

      </form>
    </div>
  );
}

export default App;
