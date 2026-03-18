import { describe, it, expect } from 'vitest';
import {
  preservationTips,
  humidityZones,
  storageDevices,
  troubleshooting,
  faq,
} from './index';

describe('Cigar Preservation Data', () => {
  describe('preservationTips', () => {
    it('should have all categories', () => {
      expect(preservationTips).toHaveProperty('humidity');
      expect(preservationTips).toHaveProperty('temperature');
      expect(preservationTips).toHaveProperty('light');
      expect(preservationTips).toHaveProperty('ventilation');
      expect(preservationTips).toHaveProperty('longTerm');
      expect(preservationTips).toHaveProperty('shortTerm');
      expect(preservationTips).toHaveProperty('aging');
    });

    it('humidity tips should have valid structure', () => {
      preservationTips.humidity.forEach(tip => {
        expect(tip).toHaveProperty('title');
        expect(tip).toHaveProperty('description');
        expect(tip).toHaveProperty('icon');
        expect(typeof tip.title).toBe('string');
        expect(typeof tip.description).toBe('string');
      });
    });

    it('temperature tips should have valid structure', () => {
      preservationTips.temperature.forEach(tip => {
        expect(tip).toHaveProperty('title');
        expect(tip).toHaveProperty('description');
        expect(tip).toHaveProperty('icon');
      });
    });
  });

  describe('humidityZones', () => {
    it('should have all zones', () => {
      expect(humidityZones).toHaveProperty('dry');
      expect(humidityZones).toHaveProperty('optimal');
      expect(humidityZones).toHaveProperty('humid');
    });

    it('dry zone should have valid structure', () => {
      const zone = humidityZones.dry;
      expect(zone).toHaveProperty('range');
      expect(zone).toHaveProperty('effects');
      expect(zone).toHaveProperty('solution');
      expect(zone.range.min).toBeLessThan(65);
      expect(zone.range.max).toBeLessThan(65);
    });

    it('optimal zone should have valid structure', () => {
      const zone = humidityZones.optimal;
      expect(zone).toHaveProperty('range');
      expect(zone).toHaveProperty('effects');
      expect(zone.range.min).toBeGreaterThanOrEqual(65);
      expect(zone.range.max).toBeLessThanOrEqual(70);
    });

    it('humid zone should have valid structure', () => {
      const zone = humidityZones.humid;
      expect(zone).toHaveProperty('range');
      expect(zone).toHaveProperty('effects');
      expect(zone.range.min).toBeGreaterThan(70);
    });
  });

  describe('storageDevices', () => {
    it('should have all device types', () => {
      expect(storageDevices).toHaveProperty('humidor');
      expect(storageDevices).toHaveProperty('sealedBox');
      expect(storageDevices).toHaveProperty('wineCooler');
      expect(storageDevices).toHaveProperty('travelTube');
    });

    it('humidor should have valid structure', () => {
      const device = storageDevices.humidor;
      expect(device).toHaveProperty('name');
      expect(device).toHaveProperty('description');
      expect(device).toHaveProperty('pros');
      expect(device).toHaveProperty('cons');
      expect(device).toHaveProperty('recommended');
      expect(Array.isArray(device.pros)).toBe(true);
      expect(Array.isArray(device.cons)).toBe(true);
    });
  });

  describe('troubleshooting', () => {
    it('should have all issues', () => {
      expect(troubleshooting).toHaveProperty('tooHumid');
      expect(troubleshooting).toHaveProperty('tooDry');
      expect(troubleshooting).toHaveProperty('mold');
      expect(troubleshooting).toHaveProperty('bloom');
      expect(troubleshooting).toHaveProperty('beetles');
      expect(troubleshooting).toHaveProperty('crackedWrapper');
    });

    it('tooHumid should have valid structure', () => {
      const issue = troubleshooting.tooHumid;
      expect(issue).toHaveProperty('symptoms');
      expect(issue).toHaveProperty('solution');
      expect(issue).toHaveProperty('severity');
      expect(Array.isArray(issue.symptoms)).toBe(true);
      expect(['low', 'medium', 'high']).toContain(issue.severity);
    });

    it('mold should have high severity', () => {
      const issue = troubleshooting.mold;
      expect(issue.severity).toBe('high');
    });

    it('beetles should have high severity', () => {
      const issue = troubleshooting.beetles;
      expect(issue.severity).toBe('high');
    });
  });

  describe('faq', () => {
    it('should have at least 5 FAQs', () => {
      expect(Array.isArray(faq)).toBe(true);
      expect(faq.length).toBeGreaterThanOrEqual(5);
    });

    it('each FAQ should have valid structure', () => {
      faq.forEach(item => {
        expect(item).toHaveProperty('question');
        expect(item).toHaveProperty('answer');
        expect(typeof item.question).toBe('string');
        expect(typeof item.answer).toBe('string');
      });
    });

    it('should have FAQ about humidity', () => {
      const humidityFaq = faq.find(f => 
        f.question.toLowerCase().includes('湿度') || 
        f.question.toLowerCase().includes('humidity')
      );
      expect(humidityFaq).toBeTruthy();
    });

    it('should have FAQ about temperature', () => {
      const tempFaq = faq.find(f => 
        f.question.toLowerCase().includes('温度') || 
        f.question.toLowerCase().includes('temperature')
      );
      expect(tempFaq).toBeTruthy();
    });
  });
});
