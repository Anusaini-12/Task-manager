const Filter = ({filter, setFilter}) => {

  return (
    <div className="flex gap-2 m-5">
      <button 
       onClick={() => setFilter("all")}     
       className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${
       filter === "all" ? "bg-purple-700 text-white" : "bg-gray-200"
       }`}
      >
        All
      </button>

      <button 
       onClick={() => setFilter("completed")} 
       className={`px-4 py-1 rounded-lg font-medium cursor-pointer ${
       filter === "completed" ? "bg-green-600 text-white" : "bg-gray-200"
       }`}
      >
        Completed
      </button>

      <button 
       onClick={() => setFilter("pending")} 
       className={`px-4 py-1 rounded-lg font-medium cursor-pointer ${
       filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"
       }`}
      >
        Pending
      </button>
    </div>
  )
};

export default Filter
