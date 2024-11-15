import Grid from '@mui/material/Grid'
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import Trophy from 'src/views/dashboard/Trophy'
import { motion } from 'framer-motion'
import { BriefcaseVariantOutline, CurrencyUsd, HelpCircleOutline, Poll } from 'mdi-material-ui'

const Dashboard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} lg={12}>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </motion.div>
          </Grid>
          <Grid item xs={3}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </motion.div>
          </Grid>
          <Grid item xs={3}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </motion.div>
          </Grid>
          <Grid item xs={3}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Trophy />
      </Grid>
      <div>
        <ul>
          <li>Total employee</li>
          <li>Total Project</li>
          <li>Today leave employee number</li>
          <li>Total apply leave employee</li>
          <li>Applicant list (interview date)</li>
          <li>If any announcement</li>
          <li>If any awards goes to any employee</li>
          <li>Today birth date employee</li>
        </ul>
      </div>
      {/* reminder */}
      <div>
        <ul>
          <li>salary reminder</li>
          <li>contract reminder</li>
          <li>admin plan reminder</li>
          <li>birthdate reminder</li>
          <li>holiday reminder</li>
        </ul>
      </div>
    </Grid>
  )
}

export default Dashboard
