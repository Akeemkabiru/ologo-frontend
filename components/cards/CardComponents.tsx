"use client";

import React from "react";
import { motion } from "framer-motion";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import {
  CheckCircle2,
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable,
  onClick,
  delay = 0,
}) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hoverable
          ? { y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }
          : {}
      }
      className={`bg-white rounded-2xl border border-gray-200/50 p-6 ${
        hoverable ? "cursor-pointer" : ""
      } ${className || ""}`}
    >
      {children}
    </motion.div>
  );
};

interface UserCardProps {
  user: {
    id: string;
    fullName: string;
    profileImage?: string;
    verified?: boolean;
  };
  onClick?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <Card hoverable onClick={onClick} className="text-center">
      <motion.div
        className="flex flex-col items-center"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {user.profileImage ? (
          <Image
            src={user.profileImage}
            alt={user.fullName}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full mb-3 border-2 border-violet-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mb-3">
            <span className="text-lg font-bold text-violet-600">
              {user.fullName.charAt(0)}
            </span>
          </div>
        )}
        <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
        {user.verified && (
          <span className="text-xs text-violet-600 mt-1 flex items-center gap-1">
            <CheckCircle2 size={16} /> Verified
          </span>
        )}
      </motion.div>
    </Card>
  );
};

interface EventCardProps {
  event: {
    id: string;
    name: string;
    description: string;
    image?: string;
    expectedAmount: number;
    amountRaised: number;
    currency: string;
    expectedDate: string;
    donorCount: number;
    status: string;
  };
  onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const progress = Math.round(
    (event.amountRaised / event.expectedAmount) * 100,
  );

  return (
    <Card hoverable onClick={onClick}>
      {event.image && (
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <motion.img
            src={event.image}
            alt={event.name}
            className="w-full h-40 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
        {event.name}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {event.description}
      </p>

      <div className="space-y-4">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(event.amountRaised, event.currency)}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              {progress}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Info */}
        <div className="flex justify-between text-sm text-gray-600">
          <span className="font-medium">{event.donorCount} donors</span>
          <span className="font-medium">
            Goal: {formatCurrency(event.expectedAmount, event.currency)}
          </span>
        </div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full inline-block ${
              event.status === "active"
                ? "bg-violet-100 text-violet-700"
                : event.status === "completed"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-100 text-gray-700"
            }`}
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </motion.div>
      </div>
    </Card>
  );
};

interface DonationCardProps {
  donation: {
    id: string;
    donorName: string;
    amount: number;
    currency: string;
    note?: string;
    submittedDate: string;
    isAnonymous: boolean;
    aliasName?: string;
  };
}

export const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  return (
    <Card>
      <motion.div
        className="flex justify-between items-start mb-3"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <div>
          <h4 className="font-semibold text-gray-900">
            {donation.isAnonymous
              ? donation.aliasName || "Anonymous"
              : donation.donorName}
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            {formatDateTime(donation.submittedDate)}
          </p>
        </div>
        <motion.span
          className="text-lg font-bold text-violet-600"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {formatCurrency(donation.amount, donation.currency)}
        </motion.span>
      </motion.div>
      {donation.note && (
        <p className="text-sm text-gray-600 italic border-l-2 border-violet-200 pl-3">
          &apos;{donation.note}&apos;
        </p>
      )}
    </Card>
  );
};

interface WalletCardProps {
  currency: string;
  balance: number;
  onClick?: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  currency,
  balance,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
    >
      <div className="absolute inset-0 bg-violet-600" />
      <motion.div
        className="absolute inset-0 bg-transparent"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <div className="relative p-6 text-white">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-sm opacity-90 mb-1 font-medium">Balance</p>
            <h3 className="text-lg font-bold">
              {formatCurrency(balance, currency)}
            </h3>
          </div>
          <motion.div
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <CreditCard size={24} className="text-white" />
          </motion.div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm opacity-90 font-medium">
            {currency} Wallet
          </span>
          <span className="text-sm font-semibold tracking-wide">
            {currency}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

interface TransactionCardProps {
  transaction: {
    id: string;
    type: string;
    amount: number;
    currency: string;
    senderName?: string;
    receiverName?: string;
    date: string;
    status: string;
    description?: string;
  };
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
}) => {
  const isIncoming = transaction.type.includes("receive");
  const Icon = isIncoming ? ArrowDownLeft : ArrowUpRight;
  const color = isIncoming ? "text-violet-600" : "text-gray-600";
  const bgColor = isIncoming ? "bg-violet-100/50" : "bg-gray-100/50";

  return (
    <Card>
      <motion.div
        className="flex items-center justify-between"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className={`${bgColor} ${color} p-3 rounded-xl`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={24} />
          </motion.div>
          <div>
            <h4 className="font-semibold text-gray-900">
              {isIncoming
                ? `From ${transaction.senderName}`
                : `To ${transaction.receiverName}`}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              {formatDateTime(transaction.date)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <motion.p
            className={`font-bold text-lg ${color}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isIncoming ? "+" : "-"}
            {formatCurrency(transaction.amount, transaction.currency)}
          </motion.p>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full inline-block mt-1 ${
              transaction.status === "completed"
                ? "bg-violet-100 text-violet-700"
                : transaction.status === "pending"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-100 text-gray-700"
            }`}
          >
            {transaction.status.charAt(0).toUpperCase() +
              transaction.status.slice(1)}
          </span>
        </div>
      </motion.div>
    </Card>
  );
};

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: number;
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon,
  trend,
  delay = 0,
}) => {
  return (
    <Card hoverable delay={delay}>
      <motion.div
        className="flex items-start justify-between"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div>
          <p className="text-sm text-gray-600 font-medium mb-2">{label}</p>
          <motion.h3
            className="text-lg font-bold text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {value}
          </motion.h3>
          {trend !== undefined && (
            <motion.p
              className={`text-sm mt-3 font-medium flex items-center gap-1 ${
                trend > 0 ? "text-violet-600" : "text-gray-600"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-lg">{trend > 0 ? "↑" : "↓"}</span>
              {Math.abs(trend)}% from last period
            </motion.p>
          )}
        </div>
        {icon && (
          <motion.div
            className="text-3xl"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        )}
      </motion.div>
    </Card>
  );
};

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <Card className="text-center py-16 border-2 border-dashed border-gray-200">
      {icon && (
        <motion.div
          className="mb-6 flex justify-center text-gray-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, color: "#d1d5db" }}
        >
          {icon}
        </motion.div>
      )}
      <motion.h3
        className="font-bold text-lg text-gray-900 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h3>
      {description && (
        <motion.p
          className="text-gray-600 mb-6 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
      {action && (
        <motion.button
          onClick={action.onClick}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2.5 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {action.label}
        </motion.button>
      )}
    </Card>
  );
};
