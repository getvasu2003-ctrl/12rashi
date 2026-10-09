import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  X,
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const ScheduledConsultationModal: React.FC = () => {
  const {
    openSlotBookingModal,
    setOpenSlotBookingModal,
    selectedBookingAstrologer,
    setSelectedBookingAstrologer,
    astrologers,
    familyProfiles,
    activeFamilyProfile,
    addScheduledBooking,
    walletBalance,
    setOpenPaymentModal,
  } = useApp();

  const [chosenAstro, setChosenAstro] = useState(selectedBookingAstrologer || astrologers[0]);
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 01 Oct');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM - 11:30 AM');
  const [durationMins, setDurationMins] = useState<15 | 30>(30);
  const [consultType, setConsultType] = useState<'video' | 'audio' | 'chat'>('video');
  const [selectedProfileId, setSelectedProfileId] = useState(activeFamilyProfile?.id || familyProfiles[0]?.id);
  const [whatsappReminder, setWhatsappReminder] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  // Synchronize when selectedBookingAstrologer changes
  React.useEffect(() => {
    if (selectedBookingAstrologer) {
      setChosenAstro(selectedBookingAstrologer);
    }
  }, [selectedBookingAstrologer]);

  if (!openSlotBookingModal) return null;

  const dates = [
    'Today, 30 Sep (Evening Slots)',
    'Tomorrow, 01 Oct',
    'Friday, 02 Oct',
    'Saturday, 03 Oct (Weekend Special)',
    'Sunday, 04 Oct',
  ];

  const timeSlots = [
    '10:00 AM - 10:30 AM',
    '11:00 AM - 11:30 AM',
    '02:30 PM - 03:00 PM',
    '04:00 PM - 04:30 PM',
    '06:30 PM - 07:00 PM',
    '08:30 PM - 09:00 PM',
  ];

  const price = durationMins === 30 ? 699 : 399;
  const currentProfile = familyProfiles.find((p) => p.id === selectedProfileId) || familyProfiles[0];

  const handleConfirmBooking = () => {
    if (walletBalance < price) {
      setOpenPaymentModal(true);
      return;
    }

    addScheduledBooking({
      astrologerId: chosenAstro.id,
      astrologerName: chosenAstro.name,
      astrologerAvatar: chosenAstro.avatar,
      astrologerTitle: chosenAstro.title,
      profileName: `${currentProfile.name} (${currentProfile.relation})`,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      durationMins,
      price,
      type: consultType,
      whatsappReminder,
    });

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setOpenSlotBookingModal(false);
    setSelectedBookingAstrologer(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-stone-900 rounded-3xl w-full max-w-xl shadow-2xl border border-orange-300 dark:border-stone-700 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-white/20">
              <Calendar className="w-5 h-5 text-amber-200" />
            </span>
            <div>
              <h3 className="font-bold text-base leading-tight">Schedule Guaranteed Consultation</h3>
              <p className="text-[11px] text-amber-100">
                Lentlo Guaranteed Slot Booking • Fixed Price • WhatsApp Alerts
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white cursor-pointer transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5 text-xs text-stone-700 dark:text-stone-300">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
                Consultation Slot Confirmed!
              </h3>
              <p className="text-stone-600 dark:text-stone-300 max-w-md mx-auto text-xs leading-relaxed">
                Your <strong>{durationMins}-minute {consultType.toUpperCase()}</strong> appointment with <strong>{chosenAstro.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTimeSlot}</strong> has been secured.
              </p>

              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 max-w-sm mx-auto text-stone-800 dark:text-stone-200 text-left space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-orange-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span>WhatsApp Reminder Enabled</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  You will receive meeting room link & reminder 15 minutes before the session on WhatsApp.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-md cursor-pointer transition hover:from-orange-600 hover:to-amber-600"
              >
                Done & View in Schedule
              </button>
            </div>
          ) : (
            <>
              {/* Astrologer Card Picker */}
              <div>
                <label className="block font-bold text-stone-900 dark:text-stone-100 mb-1.5 uppercase tracking-wide text-[11px]">
                  Select Astrologer
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {astrologers.slice(0, 4).map((astro) => (
                    <div
                      key={astro.id}
                      onClick={() => setChosenAstro(astro)}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex items-center gap-3 ${
                        chosenAstro.id === astro.id
                          ? 'border-orange-500 bg-orange-50/60 dark:bg-orange-950/30 ring-1 ring-orange-400'
                          : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      <img
                        src={astro.avatar}
                        alt={astro.name}
                        className="w-10 h-10 rounded-xl object-cover border border-orange-500/40"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-stone-900 dark:text-stone-100 text-xs truncate">
                          {astro.name}
                        </div>
                        <div className="text-[10px] text-stone-500 truncate">{astro.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Type & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-900 dark:text-stone-100 mb-1.5 uppercase tracking-wide text-[11px]">
                    Consultation Mode
                  </label>
                  <div className="flex gap-2">
                    {[
                      { id: 'video', label: 'Video Call', icon: Video },
                      { id: 'audio', label: 'Audio Call', icon: Phone },
                      { id: 'chat', label: 'Live Chat', icon: MessageSquare },
                    ].map((m) => {
                      const Icon = m.icon;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setConsultType(m.id as any)}
                          className={`flex-1 py-2 px-1.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 cursor-pointer transition ${
                            consultType === m.id
                              ? 'bg-orange-500 text-white border-orange-600'
                              : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[10px]">{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-900 dark:text-stone-100 mb-1.5 uppercase tracking-wide text-[11px]">
                    Duration & Fixed Price
                  </label>
                  <div className="flex gap-2">
                    {[
                      { mins: 15, amt: 399, label: '15 Mins' },
                      { mins: 30, amt: 699, label: '30 Mins (Best Value)' },
                    ].map((d) => (
                      <button
                        key={d.mins}
                        type="button"
                        onClick={() => setDurationMins(d.mins as any)}
                        className={`flex-1 py-2 px-2 rounded-xl border text-xs font-bold text-center cursor-pointer transition ${
                          durationMins === d.mins
                            ? 'bg-orange-500 text-white border-orange-600'
                            : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600'
                        }`}
                      >
                        <div>{d.label}</div>
                        <div className={`text-[11px] ${durationMins === d.mins ? 'text-amber-100' : 'text-orange-600'}`}>
                          ₹{d.amt}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Family Profile Association */}
              <div>
                <label className="block font-bold text-stone-900 dark:text-stone-100 mb-1.5 uppercase tracking-wide text-[11px]">
                  Consultation For (Birth Chart Profile)
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {familyProfiles.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProfileId(p.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                        selectedProfileId === p.id
                          ? 'bg-orange-500 text-white border-orange-600'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      {p.name} ({p.relation})
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block font-bold text-stone-900 dark:text-stone-100 mb-1.5 uppercase tracking-wide text-[11px]">
                  Select Date
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold cursor-pointer transition ${
                        selectedDate === d
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 font-bold'
                          : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block font-bold text-stone-900 dark:text-stone-100 mb-1.5 uppercase tracking-wide text-[11px]">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-2.5 rounded-xl border text-center text-xs font-mono transition cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-600 font-bold shadow-xs'
                          : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* WhatsApp Notification Checkbox */}
              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">WhatsApp Slot Reminders</span>
                  <span className="text-[11px] text-stone-500">Send session link & 15-minute alert to your WhatsApp</span>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappReminder}
                  onChange={(e) => setWhatsappReminder(e.target.checked)}
                  className="w-4 h-4 accent-orange-500 cursor-pointer"
                />
              </div>

              {/* Summary & Booking Submit */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500">Wallet Balance: ₹{walletBalance}</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                    Slot Fee: <span className="text-orange-600">₹{price}</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm & Book {durationMins}-Min Slot (₹{price})</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
