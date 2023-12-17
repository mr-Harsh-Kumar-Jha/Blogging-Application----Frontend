import React, {useEffect, useRef, useState} from 'react'
import brand from '../../../Assets/Harshlogo.jpeg';
import './sponsor.css';

const Spon= ({onClose, btnRef, btnRef2}) => {
   const sponsorModalRef = useRef();
   const [deActivate, setDeActivate] = useState(false);
   const [amount, setAmount] = useState(100);

   const changeAmount = (e)=>{
      setAmount(e.target.value);
   }

   useEffect(()=>{
      function checkIfClickedOutside(e){
         if(sponsorModalRef.current && !sponsorModalRef.current.contains(e.target) && !btnRef.contains(e.target) && !btnRef2.contains(e.target)){
            setTimeout(()=>{
               onClose();
            },800);
            setDeActivate(true);
         }
      }
      document.addEventListener('click', checkIfClickedOutside);
      return ()=>document.removeEventListener('click', checkIfClickedOutside);
   },[onClose, btnRef]);

   return (
      <>
         <div className="spon-container">
            <div className={!deActivate?"mainSponsor-container":"mainSponsor-container-descale"} ref={sponsorModalRef}>
               <div className="brand-sponsor-detail">
                  <div className="symbol-brand-sponsor">
                     <span className="symbol-content-sponsor">
                        <img src={brand} alt="Harsh Jha" />
                     </span>
                  </div>
                  <div className="main-textual-content-sponsor">
                     <p className="css-6l27w5">Show your support</p>
                     <h3 className="css-5337ej">Harsh Jha</h3>
                     <p className="css-x5i8pm">blogs.harshjha.vercel.app</p>
                  </div>
               </div>
               <div className="money-section-sponsor-container">
                  <div className="main-money-contaainer-sponsor">
                     <p className="css-1dtgckb">Suggested Amounts in INR</p>
                     <div className="money-bottons-sponsor">
                        <ul>
                        <li className={amount!==100?"css-3nqq7i":"active"} onClick={changeAmount} value={100}>₹ 100</li>
                        <li className={amount!==200?"css-3nqq7i":"active"} onClick={changeAmount} value={200}>₹ 200</li>
                        <li className={amount!==300?"css-3nqq7i":"active"} onClick={changeAmount} value={300}>₹ 300</li>
                        <li className={amount!==500?"css-3nqq7i":"active"} onClick={changeAmount} value={500}>₹ 500</li>
                        </ul>
                     </div>
                     <p className="css-1dtgckb2">Or Enter Custom Amount</p>
                     <div className="input-amount-sponsor">
                        <input type="text" placeholder="10" className="css-rvmzc6"/>
                        <div className="css-1goqn04">
                           <p>INR</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="buttons-sponsor-modal">
                  <button className="css-1o0uhbn" onClick={()=>{
                     setTimeout(()=>{
                        onClose();
                     },800);
                     setDeActivate(true);
                  }}>Cancel</button>
                  <button className="css-2reahb">Next</button>
               </div>
            </div>
         </div>
      </>
   )
}

export default Spon;