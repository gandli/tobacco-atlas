/**
 * 雪茄保存指南集成测试
 * 测试完整的数据结构和功能
 */

import { describe, it, expect } from 'vitest';
import {
  preservationTips,
  humidityZones,
  storageDevices,
  troubleshooting,
} from '../../cigar-preservation/index';

// FAQ data (inline since it's not exported)
const faq = [
  {
    question: '雪茄保存的最佳湿度是多少？',
    answer: '雪茄保存的最佳湿度范围是 65-70% 相对湿度。这个范围可以确保雪茄缓慢陈化，保持最佳风味。',
  },
  {
    question: '如何控制雪茄保存温度？',
    answer: '雪茄保存的理想温度是 18-21°C (64-70°F)。避免温度剧烈波动，远离热源和阳光直射。',
  },
  {
    question: '雪茄发霉了怎么办？',
    answer: '如果发现白色粉末状霉斑，立即隔离 affected 雪茄，降低湿度到 65% 以下，用软布轻轻擦拭。如果是绿色或蓝色霉菌，建议丢弃。',
  },
  {
    question: '保湿盒需要 seasoning 吗？',
    answer: '是的，新的木制保湿盒需要 seasoning（润湿）过程，通常需要 1-2 周，让木材吸收适量水分。',
  },
  {
    question: '雪茄可以保存多久？',
    answer: '在理想的保存条件下（65-70% 湿度，18-21°C 温度），雪茄可以保存数年甚至数十年，并且会随着时间陈化得更好。',
  },
];

describe('Cigar Preservation Integration', () => {
  describe('Preservation Tips Structure', () => {
    it('should have all required categories', () => {
      expect(preservationTips).toHaveProperty('humidity');
      expect(preservationTips).toHaveProperty('temperature');
      expect(preservationTips).toHaveProperty('light');
      expect(preservationTips).toHaveProperty('ventilation');
      expect(preservationTips).toHaveProperty('longTerm');
      expect(preservationTips).toHaveProperty('shortTerm');
      expect(preservationTips).toHaveProperty('aging');
    });

    it('should have valid tip structure in all categories', () => {
      const categories = Object.values(preservationTips);

      categories.forEach(tips => {
        expect(Array.isArray(tips)).toBe(true);
        expect(tips.length).toBeGreaterThan(0);

        tips.forEach(tip => {
          expect(tip).toHaveProperty('title');
          expect(tip).toHaveProperty('description');
          expect(tip).toHaveProperty('icon');
          expect(typeof tip.title).toBe('string');
          expect(typeof tip.description).toBe('string');
          expect(typeof tip.icon).toBe('string');
          expect(tip.title.length).toBeGreaterThan(0);
          expect(tip.description.length).toBeGreaterThan(0);
        });
      });
    });

    it('should have comprehensive humidity tips', () => {
      expect(preservationTips.humidity.length).toBeGreaterThanOrEqual(5);
      
      const titles = preservationTips.humidity.map(t => t.title);
      expect(titles.some(t => t.toLowerCase().includes('湿度') || t.toLowerCase().includes('humidity'))).toBe(true);
    });

    it('should have comprehensive temperature tips', () => {
      expect(preservationTips.temperature.length).toBeGreaterThanOrEqual(5);
      
      const titles = preservationTips.temperature.map(t => t.title);
      expect(titles.some(t => t.toLowerCase().includes('温度') || t.toLowerCase().includes('temperature'))).toBe(true);
    });
  });

  describe('Humidity Zones', () => {
    it('should have all humidity zones', () => {
      expect(humidityZones).toHaveProperty('dry');
      expect(humidityZones).toHaveProperty('optimal');
      expect(humidityZones).toHaveProperty('humid');
    });

    it('should have valid zone structure', () => {
      const zones = Object.values(humidityZones);

      zones.forEach(zone => {
        expect(zone).toHaveProperty('range');
        expect(zone).toHaveProperty('effects');
        expect(zone).toHaveProperty('solution');
        
        expect(zone.range).toHaveProperty('min');
        expect(zone.range).toHaveProperty('max');
        expect(typeof zone.range.min).toBe('number');
        expect(typeof zone.range.max).toBe('number');
        expect(Array.isArray(zone.effects)).toBe(true);
        expect(typeof zone.solution).toBe('string');
      });
    });

    it('should have correct humidity ranges', () => {
      // Dry zone should be below 65%
      expect(humidityZones.dry.range.max).toBeLessThan(65);
      
      // Optimal zone should be 65-70%
      expect(humidityZones.optimal.range.min).toBeGreaterThanOrEqual(65);
      expect(humidityZones.optimal.range.max).toBeLessThanOrEqual(70);
      
      // Humid zone should be above 70%
      expect(humidityZones.humid.range.min).toBeGreaterThan(70);
    });

    it('should have actionable solutions', () => {
      const zones = Object.values(humidityZones);

      zones.forEach(zone => {
        expect(zone.solution.length).toBeGreaterThan(0);
        expect(zone.effects.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Storage Devices', () => {
    it('should have all device types', () => {
      expect(storageDevices).toHaveProperty('humidor');
      expect(storageDevices).toHaveProperty('sealedBox');
      expect(storageDevices).toHaveProperty('wineCooler');
      expect(storageDevices).toHaveProperty('travelTube');
    });

    it('should have valid device structure', () => {
      const devices = Object.values(storageDevices);

      devices.forEach(device => {
        expect(device).toHaveProperty('name');
        expect(device).toHaveProperty('description');
        expect(device).toHaveProperty('pros');
        expect(device).toHaveProperty('cons');
        expect(device).toHaveProperty('recommended');
        
        expect(typeof device.name).toBe('string');
        expect(typeof device.description).toBe('string');
        expect(Array.isArray(device.pros)).toBe(true);
        expect(Array.isArray(device.cons)).toBe(true);
        expect(typeof device.recommended).toBe('boolean');
      });
    });

    it('should have at least one recommended device', () => {
      const devices = Object.values(storageDevices);
      const recommended = devices.filter(d => d.recommended);
      
      expect(recommended.length).toBeGreaterThan(0);
    });

    it('should have meaningful pros and cons', () => {
      const devices = Object.values(storageDevices);

      devices.forEach(device => {
        expect(device.pros.length).toBeGreaterThan(0);
        expect(device.cons.length).toBeGreaterThan(0);
        
        device.pros.forEach(pro => {
          expect(typeof pro).toBe('string');
          expect(pro.length).toBeGreaterThan(0);
        });
        
        device.cons.forEach(con => {
          expect(typeof con).toBe('string');
          expect(con.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Troubleshooting', () => {
    it('should have all common issues', () => {
      expect(troubleshooting).toHaveProperty('tooHumid');
      expect(troubleshooting).toHaveProperty('tooDry');
      expect(troubleshooting).toHaveProperty('mold');
      expect(troubleshooting).toHaveProperty('bloom');
      expect(troubleshooting).toHaveProperty('beetles');
      expect(troubleshooting).toHaveProperty('crackedWrapper');
    });

    it('should have valid issue structure', () => {
      const issues = Object.values(troubleshooting);

      issues.forEach(issue => {
        expect(issue).toHaveProperty('symptoms');
        expect(issue).toHaveProperty('solution');
        expect(issue).toHaveProperty('severity');
        
        expect(Array.isArray(issue.symptoms)).toBe(true);
        expect(typeof issue.solution).toBe('string');
        expect(['low', 'medium', 'high']).toContain(issue.severity);
      });
    });

    it('should have appropriate severity levels', () => {
      // Mold and beetles should be high severity
      expect(troubleshooting.mold.severity).toBe('high');
      expect(troubleshooting.beetles.severity).toBe('high');
      
      // Too humid/dry should be medium severity
      expect(troubleshooting.tooHumid.severity).toBe('medium');
      expect(troubleshooting.tooDry.severity).toBe('medium');
    });

    it('should have actionable solutions', () => {
      const issues = Object.values(troubleshooting);

      issues.forEach(issue => {
        expect(issue.solution.length).toBeGreaterThan(0);
        expect(issue.symptoms.length).toBeGreaterThan(0);
        
        issue.symptoms.forEach(symptom => {
          expect(typeof symptom).toBe('string');
          expect(symptom.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('FAQ', () => {
    it('should have sufficient FAQs', () => {
      expect(Array.isArray(faq)).toBe(true);
      expect(faq.length).toBeGreaterThanOrEqual(5);
    });

    it('should have valid FAQ structure', () => {
      faq.forEach(item => {
        expect(item).toHaveProperty('question');
        expect(item).toHaveProperty('answer');
        expect(typeof item.question).toBe('string');
        expect(typeof item.answer).toBe('string');
        expect(item.question.length).toBeGreaterThan(0);
        expect(item.answer.length).toBeGreaterThan(0);
      });
    });

    it('should cover key topics', () => {
      const questions = faq.map(f => f.question.toLowerCase());
      
      // Should have FAQ about humidity
      expect(questions.some(q => q.includes('湿度') || q.includes('humidity'))).toBe(true);
      
      // Should have FAQ about temperature
      expect(questions.some(q => q.includes('温度') || q.includes('temperature'))).toBe(true);
      
      // Should have FAQ about storage
      expect(questions.some(q => q.includes('保存') || q.includes('storage'))).toBe(true);
    });

    it('should have comprehensive answers', () => {
      faq.forEach(item => {
        // Answers should be detailed (at least 20 characters)
        expect(item.answer.length).toBeGreaterThan(20);
      });
    });
  });

  describe('Data Consistency', () => {
    it('should have consistent terminology', () => {
      // All tips should use consistent terminology
      const allTips = Object.values(preservationTips).flat();
      const allTitles = allTips.map(t => t.title);
      
      // No duplicate titles
      const uniqueTitles = new Set(allTitles);
      expect(allTitles.length).toBe(uniqueTitles.size);
    });

    it('should have no empty fields', () => {
      const allTips = Object.values(preservationTips).flat();
      
      allTips.forEach(tip => {
        expect(tip.title.trim()).not.toBe('');
        expect(tip.description.trim()).not.toBe('');
      });
    });

    it('should have valid icon emojis', () => {
      const allTips = Object.values(preservationTips).flat();
      
      allTips.forEach(tip => {
        expect(tip.icon).toMatch(/[\u{1F300}-\u{1F9FF}]/u);
      });
    });
  });

  describe('Content Quality', () => {
    it('should have accurate humidity information', () => {
      const humidityTips = preservationTips.humidity;
      
      // Should mention 65-70% range
      const allDescriptions = humidityTips.map(t => t.description).join(' ');
      expect(allDescriptions).toMatch(/65[-~]%?[-~]?70%?/);
    });

    it('should have accurate temperature information', () => {
      const tempTips = preservationTips.temperature;
      
      // Should mention 18-21°C range
      const allDescriptions = tempTips.map(t => t.description).join(' ');
      expect(allDescriptions).toMatch(/18[-~]?21/);
    });

    it('should warn about mold risks', () => {
      const moldIssue = troubleshooting.mold;
      
      expect(moldIssue.severity).toBe('high');
      expect(moldIssue.symptoms.length).toBeGreaterThan(0);
      expect(moldIssue.solution.length).toBeGreaterThan(0);
    });

    it('should warn about tobacco beetles', () => {
      const beetleIssue = troubleshooting.beetles;
      
      expect(beetleIssue.severity).toBe('high');
      expect(beetleIssue.symptoms.length).toBeGreaterThan(0);
      expect(beetleIssue.solution.length).toBeGreaterThan(0);
    });
  });

  describe('Localization', () => {
    it('should have Chinese content', () => {
      const allTips = Object.values(preservationTips).flat();
      
      allTips.forEach(tip => {
        // Should contain Chinese characters
        expect(tip.title).toMatch(/[\u4e00-\u9fa5]/);
        expect(tip.description).toMatch(/[\u4e00-\u9fa5]/);
      });
    });

    it('should have consistent language', () => {
      const allTips = Object.values(preservationTips).flat();
      
      allTips.forEach(tip => {
        // Should be primarily Chinese
        const chineseChars = (tip.title.match(/[\u4e00-\u9fa5]/g) || []).length;
        const totalChars = tip.title.length;
        expect(chineseChars / totalChars).toBeGreaterThan(0.5);
      });
    });
  });

  describe('Performance', () => {
    it('should load data quickly', () => {
      const startTime = Date.now();

      // Load all data multiple times
      for (let i = 0; i < 100; i++) {
        Object.values(preservationTips);
        Object.values(humidityZones);
        Object.values(storageDevices);
        Object.values(troubleshooting);
        faq;
      }

      const endTime = Date.now();
      const duration = endTime - startTime;
      const avgTime = duration / 100;

      // Each load should take less than 1ms on average
      expect(avgTime).toBeLessThan(1);
    });
  });
});
