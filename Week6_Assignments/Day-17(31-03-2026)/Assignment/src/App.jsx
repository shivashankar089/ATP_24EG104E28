import EditCounter1 from './components/EditCounter1'
import EditCounter2 from './components/EditCounter2'
import EditCounter3 from './components/EditCounter3'
import EditCounter4 from './components/EditCounter4'

function App() {
  return (
    <div className="grid grid-cols-2 mt-50 gap-3 w-4xl block mx-auto">
      <div className="bg-orange-500 rounded-2xl border">
        <EditCounter1 />
      </div>
      <div className="bg-orange-500 rounded-2xl border">
        <EditCounter2 />
      </div>
      <div className="bg-orange-500 rounded-2xl border">
        <EditCounter3 />
      </div>
      <div className="bg-orange-500 rounded-2xl border">
        <EditCounter4 />
      </div>
    </div>
  )
}

export default App
