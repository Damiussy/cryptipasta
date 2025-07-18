'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Comment } from '@/types';
import { useCommentsRefresh } from '@/hooks/useCommentsRefresh';

interface CommentsSectionProps {
  pageSlug: string;
}

export default function CommentsSection({ pageSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const { addRefreshListener } = useCommentsRefresh();

  // Load comments
  const loadComments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/comments?page_slug=${pageSlug}`);
      
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      } else {
        setError('Failed to load comments');
      }
    } catch (error) {
      console.error('Error loading comments:', error);
      setError('Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [pageSlug]);

  // Listen for username changes and refresh comments
  useEffect(() => {
    const cleanup = addRefreshListener(() => {
      console.log('Refreshing comments due to username change');
      loadComments();
    });
    return cleanup;
  }, [addRefreshListener]);

  // Also refresh when session changes
  useEffect(() => {
    if (session?.user) {
      console.log('Session changed, refreshing comments');
      loadComments();
    }
  }, [session?.user?.name]);

  // Add comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user) {
      setError('You must be logged in to comment');
      return;
    }

    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch('/api/comments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_slug: pageSlug,
          content: newComment.trim()
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments([data.comment, ...comments]);
        setNewComment('');
      } else {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        setError(errorData.error || 'Failed to add comment');
        if (errorData.details) {
          console.error('Error details:', errorData.details);
        }
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get user initial
  const getUserInitial = (comment: Comment) => {
    const username = comment.user?.user_metadata?.username || comment.user?.email?.split('@')[0] || 'U';
    return username.charAt(0).toUpperCase();
  };

  // Get display name
  const getDisplayName = (comment: Comment) => {
    return comment.user?.user_metadata?.username || comment.user?.email?.split('@')[0] || 'Unknown User';
  };

  // Delete comment
  const handleDeleteComment = async (commentId: string) => {
    if (!session?.user) return;

    try {
      const response = await fetch('/api/comments/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId }),
      });

      if (response.ok) {
        // Remove comment from state
        setComments(comments.filter(comment => comment.id !== commentId));
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError('Failed to delete comment');
    }
  };

  return (
    <div className="comments-section">
      <h3 className="comments-title linear-text-gradient">Comments</h3>
      
      {/* Add comment form */}
      {session?.user && (
        <form onSubmit={handleSubmitComment} className="comment-form">
          <div className="comment-input-container">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="comment-input"
              rows={3}
              maxLength={1000}
              disabled={isSubmitting}
            />
            <div className="comment-input-footer">
              <span className="comment-char-count">
                {newComment.length}/1000
              </span>
              <button
                type="submit"
                className="auth-button comment-submit-btn"
                disabled={isSubmitting || !newComment.trim()}
              >
                <span className="linear-text-gradient">
                  {isSubmitting ? 'Sending...' : 'Comment'}
                </span>
              </button>
            </div>
          </div>
          {error && <div className="auth-message error">{error}</div>}
        </form>
      )}

      {/* List of comments */}
      <div className="comments-list">
        {isLoading ? (
          <div className="comments-loading linear-text-gradient">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="comments-empty linear-text-gradient">No comments yet. Be the first to comment!</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <Link href="/profile" className="comment-avatar-link">
                  <div className="comment-avatar">
                    {comment.user?.user_metadata?.avatar_url ? (
                      <img
                        src={comment.user.user_metadata.avatar_url}
                        alt="Avatar"
                        className="comment-avatar-image"
                      />
                    ) : (
                      <div className="comment-avatar-placeholder">
                        <span className="linear-text-gradient">
                          {getUserInitial(comment)}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="comment-meta">
                  <Link href="/profile" className="comment-author-link">
                    <div className="comment-author linear-text-gradient">
                      {getDisplayName(comment)}
                    </div>
                  </Link>
                  <div className="comment-date">
                    {formatDate(comment.created_at)}
                  </div>
                </div>
                {session?.user?.id === comment.user_id && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="comment-delete-btn"
                    title="Delete comment"
                  >
                    <span className="linear-text-gradient">×</span>
                  </button>
                )}
              </div>
              <div className="comment-content">
                {comment.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 