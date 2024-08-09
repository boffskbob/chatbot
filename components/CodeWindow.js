// components/CodeSection.js
import { Box, Typography } from '@mui/material';

export default function CodeSection() {
  return (
    <Box sx={{ padding: 4, width: '50%', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Code</Typography>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {`class Solution(object):
    def twoSum(self, nums, target):
        hashmap = {}
        for i in range(len(nums)):
            difference = target - nums[i]
            if difference in hashmap:
                return [hashmap[difference], i]
            hashmap[nums[i]] = i`}
      </pre>
    </Box>
  );
}
