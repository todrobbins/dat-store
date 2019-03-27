const subcommand = require('subcommand')

subcommand([{
  name: 'add',
  command: add,
  help: 'Pin a `dat://` read key to your pinning service to keep it online'
}, {
  name: 'remove',
  command: remove,
  help: 'Remove a `dat://` read key from your pinning service'
}, {
  name: 'list',
  command: list,
  help: 'List the `dat://` read keys that you\'ve pinned'
}, {
  name: 'set-service',
  command: setService,
  help: 'Set the URL of the pinning service you want to use'
}, {
  name: 'unset-service',
  command: unsetService,
  help: 'Resets your preferences to use your local pinning service'
}, {
  name: 'get-service',
  command: getService,
  help: 'Get the URL for your pinning service'
}, {
  name: 'login',
  command: login,
  options: [{
    name: 'username',
    abbr: 'u'
  }, {
    name: 'password',
    abbr: 'p'
  }],
  help: 'Logs you into the configured pinning service. Not necessary for local services'
}, {
  name: 'logout',
  command: logout,
  help: 'Logs you out of the pinning service'
}, {
  name: 'install-service',
  command: installService,
  help: 'Installs a local pinning service on your computer. This will run in the background while your computer is active.'
}, {
  name: 'uninstall-service',
  command: uninstallService,
  help: 'Uninstalls your local pinning service.'
}])(process.argv.slice(2))

function getClient (args) {
  const PeerClient = require('./client')

  const client = new PeerClient(args)

  return client
}

async function add (args) {
  await getClient(args).add(args._[0])
}

async function list (args) {
  const { items } = await getClient(args).list()

  for (let { url } of items) {
    console.log(url)
  }
}

async function remove (args) {
  await getClient(args).remove(args._[0])
}

async function setService (args) {
  await getClient(args).setService(args._[0])
}

async function unsetService (args) {
  await getClient(args).unsetService()
}

async function getService (args) {
  const service = await getClient(args).getService()

  console.log(service)
}

async function login (args) {
  await getClient(args).login(args.username, args.password)
}

async function logout (args) {
  await getClient(args).logout()
}

async function installService (args) { console.log('TODO', args) }

async function uninstallService (args) { console.log('TODO', args) }