'use client';

import React from 'react';
import Image from 'next/image';
import { TrackData } from '@/types/dashboard';
import { getFallbackInitials } from '@/lib/utils';

interface TracksProps {
  tracks?: TrackData[];
}

function Tracks({ tracks = [] }: TracksProps) {
  return (
    <>
      <div className="max-w-full rounded-xl border border-gray-100 bg-white p-4 h-full">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Tracks</h2>
        <div className="flex flex-col gap-6">
          {tracks.map((track, idx) => (
            <div
              key={idx}
              className="rounded-xl border-l-4 border-blue-500 bg-gray-50 p-6"
            >
              <div className="flex items-start justify-between gap-1">
                <div>
                  <h3 className="font-semibold text-gray-900">{track.track_name}</h3>
                </div>
                <div className="flex items-center gap-1">
                  {track.active_members.slice(0, 3).map((member, index) => (
                    <div
                      key={index}
                      className="relative z-10 -ml-2 h-6 w-6 overflow-hidden rounded-full border-2 border-white bg-blue-100 flex items-center justify-center"
                    >
                      {member.avatar_url ? (
                        <Image
                          src={member.avatar_url}
                          alt={member.display_name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-[10px] font-bold text-blue-600">
                          {getFallbackInitials(member.display_name)}
                        </span>
                      )}
                    </div>
                  ))}
                  {track.member_count > 3 && (
                    <span className="relative z-10 -ml-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-500">
                      +{track.member_count - 3}
                    </span>
                  )}
                </div>
              </div>
              <p className="mb-2 text-sm text-gray-500 mt-2">
                {track.uncompleted_task_count} uncompleted tasks
              </p>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${Math.min(100, (1 - (track.uncompleted_task_count / (track.uncompleted_task_count + 10))) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
          {tracks.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">No tracks data available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Tracks;
