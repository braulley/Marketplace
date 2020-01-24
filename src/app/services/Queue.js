const kue = require('kue')
const redisConfig = require('../../config/radis')
const jobs = require('../jobs')

const Queue = kue.createQueue({redis: redisConfig})

Queue.process(jobs.PurchaseMail.Key, jobs.PurchaseMail.handle)

module.exports = Queue