import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs/promises";
import treeContent from './tree.json'
function App() {
  const [tree, setTree] = useState<StandardMerkleTree<any>>();
  const [addr, setAddr] = useState('')
  const [rewards, setRewards] = useState('')
  const [preRewards, setPreRewards] = useState('')
  const [id, setId] = useState('')
  const [prof, setProf] = useState<string>()
  useState([tree, setTree])

  useEffect(() => {
    setTree(StandardMerkleTree.load(treeContent as any));
  }, []);

  const getMerkleProof = () => {
    console.log(tree);
    try {
      const _prof = tree?.getProof([id, addr, preRewards, rewards]);
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
          <span>Address: </span>
          <input
            type="text"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
          />

        </div>

        <div className='row'>
          <span>Rewards:  </span>
          <input
            type="text"
            value={rewards}
            onChange={(e) => setRewards(e.target.value)}
          />

        </div>

        <div className='row'>
          <span>Pre Rewards:</span>
          <input
            type="text"
            value={preRewards}
            onChange={(e) => setPreRewards(e.target.value)}
          />

        </div>

        <div className='row'>
          <span>Id:</span>

          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
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
