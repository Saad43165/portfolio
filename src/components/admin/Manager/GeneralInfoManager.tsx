import React from 'react';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';
import PortfolioInfoForm from '../Forms/PortfolioInfoForm';

const GeneralInfoManager = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">
            General Information
          </h2>
          <p className="text-gray-500 font-medium">
            Manage your global portfolio data, hero section, and social links.
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
          <Info size={32} />
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-50">
        <PortfolioInfoForm />
      </div>
    </motion.div>
  );
};

export default GeneralInfoManager;
