import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI component
import Alert from '@material-ui/lab/Alert'

const Alerting = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((al) => (
    <Alert key={al.id} variant="filled" severity={al.severity}>
      {al.msg}
    </Alert>
  ))

Alerting.propTypes = {
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  alerts: state.alertReducer,
})

export default connect(mapStateToProps)(Alerting)
