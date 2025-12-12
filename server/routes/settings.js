const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { authenticateAdmin } = require('../middleware/auth');

// @route   GET /api/settings/donations
// @desc    Get donation settings (public)
// @access  Public
router.get('/donations', async (req, res) => {
  try {
    // Get donation goal
    const goal = await Settings.getSetting('donation_goal', 100000);
    
    // Get preset amounts
    const presetAmounts = await Settings.getSetting('donation_preset_amounts', [100, 500, 1000, 5000,10000]);
    
    // Get default amount
    const defaultAmount = await Settings.getSetting('donation_default_amount', 50);
    
    // Get impact examples
    const impactExamples = await Settings.getSetting('donation_impact_examples', [
      { amount: 500, text: 'School supplies for a girl' },
      { amount: 5000, text: 'Feeds a family for a month' },
      { amount: 10000, text: 'Installs a handwashing station' }
    ]);
    
    // Get quick donate amounts (for floating button)
    const quickDonateAmounts = await Settings.getSetting('donation_quick_amounts', [100, 500, 1000, 5000,10000]);
    
    // Get donation options (for GetInvolved page)
    const donationOptions = await Settings.getSetting('donation_options', [
      {
        title: 'Monthly Donor',
        amount: '1,000 KES',
        description: 'Support our ongoing programs with a monthly contribution.',
        impact: 'Provides education for 1 woman per month'
      },
      {
        title: 'Program Sponsor',
        amount: '5,000 KES',
        description: 'Sponsor a specific program or workshop.',
        impact: 'Funds a complete skills training program'
      },
      {
        title: 'Community Builder',
        amount: '10,000 KES',
        description: 'Help build and expand our community centers.',
        impact: 'Supports community infrastructure development'
      },
      {
        title: 'Life Changer',
        amount: '25,000 KES',
        description: 'Transform lives with a significant contribution.',
        impact: 'Provides comprehensive support for 5 women'
      }
    ]);

    res.json({
      success: true,
      data: {
        goal,
        presetAmounts,
        defaultAmount,
        impactExamples,
        quickDonateAmounts,
        donationOptions
      }
    });
  } catch (error) {
    console.error('Get donation settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donation settings'
    });
  }
});

// @route   PUT /api/settings/donations
// @desc    Update donation settings
// @access  Admin
router.put('/donations', authenticateAdmin, async (req, res) => {
  try {
    const { goal, presetAmounts, defaultAmount, impactExamples, quickDonateAmounts, donationOptions } = req.body;

    const updates = {};
    if (goal !== undefined) updates.goal = goal;
    if (presetAmounts !== undefined) updates.presetAmounts = presetAmounts;
    if (defaultAmount !== undefined) updates.defaultAmount = defaultAmount;
    if (impactExamples !== undefined) updates.impactExamples = impactExamples;
    if (quickDonateAmounts !== undefined) updates.quickDonateAmounts = quickDonateAmounts;
    if (donationOptions !== undefined) updates.donationOptions = donationOptions;

    for (const [key, value] of Object.entries(updates)) {
      const settingKey = `donation_${key}`;
      await Settings.setSetting(
        settingKey,
        value,
        `Donation ${key} setting`,
        'donations'
      );
    }

    res.json({
      success: true,
      message: 'Donation settings updated successfully'
    });
  } catch (error) {
    console.error('Update donation settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update donation settings'
    });
  }
});

module.exports = router;

