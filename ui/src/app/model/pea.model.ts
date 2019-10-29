export interface PeaMember {
  address?: string
  port?: number
  hostname?: string
}

export interface MonitorData {
  complete?: boolean
  start?: number
  run?: number
  total?: TotalCounters
  users?: { [k: string]: PeaUserCounters }
  requests?: { [k: string]: RequestCounters }
  global?: RequestCounters
  errors?: { [k: string]: number }
}

export interface TotalCounters {
  total?: number
  waiting?: number
  active?: number
  done?: number
}

export interface PeaUserCounters {
  total?: number
  active?: number
  done?: number
  waiting?: number
  percent?: number
}

export interface RequestCounters {
  successfulCount?: number
  failedCount?: number
}

export interface JobWorkerStatus {
  status?: string
  errMsg?: string
  runId?: string
  start?: number
  end?: number
  code?: number
}

export interface ReporterJobStatus {
  status?: string
  runId?: string
  start?: number
  end?: number
  workers?: { [k: string]: JobWorkerStatus }
  load?: SingleHttpScenarioMessage & RunSimulationMessage
}

export interface SimulationModel {
  name?: string
  protocols?: string[]
  description?: string
}

export interface Simulations {
  last?: number
  editorBaseUrl?: string
  simulations?: SimulationModel[]
}

export interface SingleRequest {
  name?: string
  url?: string
  method?: string
  headers?: Object
  body?: string
}

export interface During {
  value?: number
  unit?: string
}

export interface Injection {
  type?: string
  users?: number
  to?: number
  during?: During
}

export interface LoadMessage {
  simulationId?: string
  start?: number
  report?: boolean
  verbose?: boolean
  type?: string
}

export interface SingleHttpScenarioMessage extends LoadMessage {
  name?: string
  request?: SingleRequest
  injections?: Injection[]
}

export interface RunSimulationMessage extends LoadMessage {
  simulation?: string
}

export interface SingleHttpScenarioJob {
  workers?: PeaMember[]
  request?: SingleHttpScenarioMessage
}

export interface RunSimulationJob {
  workers?: PeaMember[]
  request?: RunSimulationMessage
}

export interface WorkersAvailable {
  available?: boolean
  errors?: { [k: string]: string }
  runId?: string
}

export interface Oshi {
  os?: string
  'memory.total'?: number
  'memory.available'?: number
  'cpu.name'?: number
  'cpu.physical.processor.count'?: number
  'cpu.logical.processor.count'?: number
}

export const TimeUnit = {
  TIME_UNIT_MILLI: 'milli',
  TIME_UNIT_SECOND: 'second',
  TIME_UNIT_MINUTE: 'minute',
  TIME_UNIT_HOUR: 'hour',
}

export const InjectionType = {
  TYPE_RAMP_USERS: 'rampUsers',
  TYPE_HEAVISIDE_USERS: 'heavisideUsers',
  TYPE_AT_ONCE_USERS: 'atOnceUsers',
  TYPE_CONSTANT_USERS_PER_SEC: 'constantUsersPerSec',
  TYPE_RAMP_USERS_PER_SEC: 'rampUsersPerSec',
}

export const HttpMethods = {
  OPTIONS: 'OPTIONS',
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  TRACE: 'TRACE',
}

export const MemberStatus = {
  IDLE: 'idle',
  RUNNING: 'running',
  IIL: 'ill',
  GATHERING: 'gathering',
  REPORTING: 'reporting',
  FINISHED: 'finished',
}
