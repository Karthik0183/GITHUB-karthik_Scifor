
import { useEffect, useState } from 'react';
import './App.css';
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale);



function App() {
  const [tran,setTran]=useState([])
  const [loaded, setLoaded] = useState(false);
  const [desc,setDesc]=useState("");
  const [cate,setCate]=useState("");
  const [filcate,setfilCate]=useState("");
  const [amt,setAmt]=useState("");
  const [note,setNote]=useState("");
  const [date,setDate]=useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const[type,setType]=useState("expense");
  const[tab,setTab]=useState("summary");

 let inc=0;
 let exp=0;
 tran.forEach((t)=>{
  if(t.type==="income"){
    inc+=Number(t.amt);
 }else{
  exp+=Number(t.amt);
 }
})
const bal=inc-exp;

  const Transaction=()=>{
  const transaction={
    type,
    desc,
    cate,
    amt,
    note,
    date,
  };
  setTran([...tran,transaction])

  
  setSuccessMsg("Transaction added successfully");

setTimeout(() => {
  setSuccessMsg("");
}, 2000);

  setAmt("")
  setCate("")
  setDate("")
  setDesc("")
  setNote("")

}
useEffect(()=>{
  const save=localStorage.getItem("transactions");
  if(save){
    setTran(JSON.parse(save));
  }
  setLoaded(true);
},[]);

useEffect(()=>{
  if(loaded)
  {localStorage.setItem("transactions",JSON.stringify(tran));}
},[tran,loaded]);

 const visdata={
  labels:["income","expense"],
  datasets:[{
    data:[inc,exp],
    backgroundColor:["green","red"]
  },],
 };

 const explabel=tran.filter(t=>t.type==="expense").map(t=>`${t.desc}(${t.cate})`);
 const expamts=tran.filter(t=>t.type==="expense").map(t=>Number(t.amt));
 const expbardata={
  labels:explabel,
  datasets:[{
    label:"Expenses",
    data:expamts,
    backgroundColor:"red",
  },],
 };
  return (<div>
    <h1>Expense Management</h1>
    {successMsg && (
  <div className="success-box">
    ✔ {successMsg}
  </div>
)}
    <p>ADD Income/Expense</p>
    <label htmlFor="type">Type Of Transaction</label>
    <select id='type' value={type} onChange={(e)=>setType(e.target.value)}>
    <option value={'expense'}>Expense</option>
    <option value={'income'}>Income</option>
    </select> 
    {type==='expense'&&(<form onSubmit={(e)=>{
      e.preventDefault();
      Transaction();
    }}>
      <input className='tran' type='text' id='desc' value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder='What was the expense?' required></input>
      <input className='tran' type='text' id='cate' value={cate} onChange={(e)=>setCate(e.target.value)} placeholder='category of expense' required></input>
      <input className='tran' type='number' id='amt' value={amt} onChange={(e)=>setAmt(e.target.value)} placeholder='Amount' min={1} required></input>
      <textarea className='tran' id='note' value={note} onChange={(e)=>setNote(e.target.value)} placeholder='Note'></textarea>
      <input className='tran' type='date' id='date' value={date} onChange={(e)=>setDate(e.target.value)}required></input>
      <button type='submit' className='add-btn'>Add</button>
    </form>)}
    {type==='income'&&(<form
    onSubmit={(e)=>{
      e.preventDefault();
      Transaction();
    }}>
      <input className='tran' type='text' id='desc' value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder='From where was the income?' required></input>
      <input className='tran' type='text' id='cate' value={cate} onChange={(e)=>setCate(e.target.value)} placeholder='category of income' required></input>
      <input  className='tran' type='number' id='amt' value={amt} onChange={(e)=>setAmt(e.target.value)} placeholder='Amount' min={1} required></input>
      <textarea className='tran' id='note' value={note} onChange={(e)=>setNote(e.target.value)} placeholder='Note'></textarea>
      <input className='tran' type='date' id='date' value={date} onChange={(e)=>setDate(e.target.value)} required></input>
      <button type='submit' className='add-btn'>Add</button>
    </form>)}
    <div className='tab'>
      <button className={tab==="summary"?'active':''} onClick={()=>setTab("summary")}>Summary</button>
      <button className={tab==="transaction"?'active':''} onClick={()=>setTab("transaction")}>Transaction</button>
    </div>
 {tab==="summary"&&(
      
<>
<h2>Monthly Summary</h2>

<p><b>Total Income:</b> ₹{inc}</p>
<p><b>Total Expense:</b> ₹{exp}</p>
<p><b>Balance:</b> ₹{bal}</p>

<hr />
{tran.length>0&&(<>
<div className='chart'>
  <h3>Income Vs Expense</h3>
  <Pie data={visdata}/>
</div>

<div className='chart'>
  <h3>Expense Chart</h3>
  <Bar data={expbardata}/>
</div>
</>)}
</>)}
{tab==="transaction"&&(
  <><div className='transaction-layout'>
   
      <div className='filter'>
  <h3>Filter by Category</h3>
  <input type='text' placeholder='Enter a category(eg. Food)' value={filcate} 
  onChange={(e)=>setfilCate(e.target.value)}/>
</div>
<div className='transaction-list'>
   <h2>Transactions</h2>
  {tran.length === 0 && <p>No transactions added</p>}

  {tran.filter((t)=>t.cate.toLowerCase().includes(filcate.toLowerCase())).map((t, i) => (
  <div key={i} className="student-box">

    <p><b>Description:</b> {t.desc}</p>
    <p><b>Type:</b> {t.type}</p>
    <p><b>Category:</b> {t.cate}</p>
    <p><b>Amount:</b> ₹{t.amt}</p>
    <p><b>Date:</b> {t.date}</p>

    {t.note && (
      <p><b>Note:</b> {t.note}</p>
    )}

  </div>
))}
 </div>
</div>
</>
)}
  </div>
  );
}

export default App;
