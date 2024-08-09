// components/ProblemDescription.js
import { Box, Typography, Chip } from '@mui/material';

export default function ProblemDescription() {
  return (
    <Box sx={{ padding: 4, width: '50%' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>1. Two Sum</Typography>
      <Box sx={{ mb: 2 }}>
        <Chip label="Easy" sx={{ mr: 1 }} />
        <Chip label="Topics" sx={{ mr: 1 }} />
        <Chip label="Companies" sx={{ mr: 1 }} />
        <Chip label="Hint" sx={{ mr: 1 }} />
        <Chip label="Ask Prep" />
      </Box>
      <Typography sx={{ mb: 2 }}>
        Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to the target.
      </Typography>
      <Typography sx={{ mb: 2 }}>
        You may assume that each input would have exactly one solution, and you may not use the same element twice.
      </Typography>
      <Typography sx={{ mb: 2 }}>
        You can return the answer in any order.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        <strong>Example 1:</strong><br />
        Input: nums = [2,7,11,15], target = 9<br />
        Output: [0,1]<br />
        Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        <strong>Example 2:</strong><br />
        Input: nums = [3,2,4], target = 6<br />
        Output: [1,2]
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        <strong>Example 3:</strong><br />
        Input: nums = [3,3], target = 6<br />
        Output: [0,1]
      </Typography>
    </Box>
  );
}
