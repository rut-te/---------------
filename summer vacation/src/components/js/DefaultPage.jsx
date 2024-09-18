import { Link } from 'react-router-dom'

export default function DefaultPage({ string }) {

    return (
        <div className='defaultPage'>
            <h1 className='welcome'>{string}</h1>
            <div className='entrance'>
                {<Link to={`/home`}>לצפייה בתחזית מסביב לעולם</Link>}
            </div>
        </div>
    )
}
