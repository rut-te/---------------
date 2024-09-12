import { useNavigate } from 'react-router-dom'

export default function SpecificCity({string}) {

    const navigate = useNavigate();

    return (
        
        <div className="messege">
                <button className='closeBodyPost' onClick={() => navigate("..")}>❌</button>

            <h3>hiii</h3>
        </div>
    )
}