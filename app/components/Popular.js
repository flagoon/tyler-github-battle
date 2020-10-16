import React from 'react'
import PropTypes from 'prop-types'
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from 'react-icons/fa'
import { fetchPopularRepos } from '../utils/api'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button
            type='button'
            className='btn-clear nav-link'
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
}

function ReposGrid({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const {
          owner,
          html_url: htmlUrl,
          stargazers_count: starCount,
          forks,
          open_issues: openIssues,
        } = repo
        const { login, avatar_url: avatarUrl } = owner
        return (
          <Card
            header={`#${index + 1}`}
            name={login}
            avatar={avatarUrl}
            href={htmlUrl}
            key={htmlUrl}
          >
            <ul className='card-list'>
              <li>
                <Tooltip text="Githab user's name">
                  <FaUser color='blue' size={22} />
                  <a href={`https://github.com/${login}`}>{login}</a>
                </Tooltip>
              </li>
              <li>
                <FaStar color='rgb(255, 191, 116' size={22} />
                {starCount.toLocaleString()} starts
              </li>
              <li>
                <FaCodeBranch color='grey' size={22} />
                {forks.toLocaleString()} branches
              </li>
              <li>
                <FaExclamationTriangle color='red' size={22} />
                {openIssues.toLocaleString()} open issues
              </li>
            </ul>
          </Card>
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      owner: PropTypes.shape({
        login: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
      }).isRequired,
      html_url: PropTypes.string.isRequired,
      stargazers_count: PropTypes.number.isRequired,
      forks: PropTypes.number.isRequired,
      open_issues: PropTypes.number.isRequired,
    })
  ).isRequired,
}

function languageReducer(state, action) {
  switch (action.type) {
    case 'FETCH_REPOS':
      return { ...state, loading: true, error: null }
    case 'FETCH_REPOS_SUCCESS':
      return {
        ...state,
        loading: false,
        repos: { ...state.repos, ...action.payload },
      }
    case 'FETCH_REPOS_FAIL':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = React.useState('All')
  const [state, dispatch] = React.useReducer(languageReducer, {
    repos: {},
    error: null,
    loading: false,
  })

  /**
   * This ref is for holding array of already downloaded languages. We need to keep data between rerenders without
   * causing rerender. FetchLanguages is always 'the same', meaning it's showing in the same place in memory.
   */
  const fetchedLanguages = React.useRef([])

  React.useEffect(() => {
    if (!state.repos[selectedLanguage]) {
      fetchedLanguages.current.push(selectedLanguage)
      dispatch({ type: 'FETCH_REPOS' })
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          dispatch({
            type: 'FETCH_REPOS_SUCCESS',
            payload: { [selectedLanguage]: data },
          })
        })
        .catch((error) => {
          console.warn('Error fetching repos: ', error)

          dispatch({ type: 'FETCH_REPOS_FAIL', payload: error.message })
        })
    }
  }, [selectedLanguage])

  return (
    <>
      <LanguagesNav
        selected={selectedLanguage}
        onUpdateLanguage={setSelectedLanguage}
      />

      {state.loading && <Loading text='Fetching repos' />}

      {state.error && <p className='center-text error'>{state.error}</p>}

      {state.repos[selectedLanguage] && (
        <ReposGrid repos={state.repos[selectedLanguage]} />
      )}
    </>
  )
}

class Popular2 extends React.Component {
  state = {
    repos: {},
    error: null,
  }

  componentDidMount() {
    const { selectedLanguage } = this.state
    this.updateLanguage(selectedLanguage)
  }

  isLoading = () => {
    const { selectedLanguage, repos, error } = this.state

    return !repos[selectedLanguage] && error === null
  }

  render() {
    const { selectedLanguage, repos, error } = this.state

    return (
      <>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <Loading text='Fetching repos' />}

        {error && <p className='center-text error'>{error}</p>}

        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </>
    )
  }
}
