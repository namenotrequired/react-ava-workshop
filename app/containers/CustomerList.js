import React, {PropTypes} from 'react'
import store from '../store/Customers'

class CustomerList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {customers: []}
  }
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.updateStateWithCustomers())
    this.updateStateWithCustomers()
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  updateStateWithCustomers() {
    this.setState({customers: this.props.store.getCustomers()})
  }
  render() {
    const {customers} = this.state
    if (customers.length === 0) {
      return <NoCustomers />
    } else {
      return <ListOfCustomers customers={customers} />
    }
  }
}

CustomerList.propTypes = {
  store: PropTypes.shape({
    getCustomers: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }).isRequired,
}

CustomerList.defaultProps = {store}

function ListOfCustomers({customers}) {
  return (
    <div>
      Here is your list of customers!
      <ul>
        {customers.map((c, i) => <Customer key={i} {...c} />)}
      </ul>
    </div>
  )
}

ListOfCustomers.propTypes = {
  customers: PropTypes.array,
}

function NoCustomers() {
  return (
    <div>
      You have no customers. Better get to work!
    </div>
  )
}

function Customer({name}) {
  return <li key={name}>{name}</li>
}

Customer.propTypes = {
  name: PropTypes.string,
}

export default CustomerList
