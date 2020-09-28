import React from 'react'

// Styles
import { Typography } from '@material-ui/core'

type Props = {
	question: string
	questionNr: number
	totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
	question,
	questionNr,
	totalQuestions,
}) => (
	<div>
		<Typography>
			Question: {questionNr} / {totalQuestions}
		</Typography>
		<Typography dangerouslySetInnerHTML={{ __html: question }} />
	</div>
)

export default QuestionCard
